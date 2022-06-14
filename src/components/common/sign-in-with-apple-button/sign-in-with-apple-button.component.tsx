import * as React from 'react'
import { useState } from 'react'
import * as AppleAuthentication from 'expo-apple-authentication'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithCredential, OAuthProvider } from 'firebase/auth'

// Components
import Loading from '../loading/loading.component'

import { showError } from '~helpers/flash-message.helpers'
import { checkIfUserIsRegistered } from '~helpers/auth.helpers'
import { WelcomeScreenNavigationProp } from '~navigators/auth/auth-stack.navigator.types'
import { loginUser } from '~store/user/user.actions'
import { useAppDispatch } from '~store'

interface SignInWithAppleButtonProps {}

const SignInWithAppleButton: React.FunctionComponent<
  SignInWithAppleButtonProps
> = () => {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<WelcomeScreenNavigationProp>()

  const dispatch = useAppDispatch()

  const handlePress = async () => {
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      setIsLoading(true)

      const provider = new OAuthProvider('apple.com')

      const credential = provider.credential({
        idToken: appleCredential.identityToken!
      })

      const { user } = await signInWithCredential(getAuth(), credential)

      const authToken = await user.getIdToken()

      const userIsRegistered = await checkIfUserIsRegistered(
        user.uid,
        authToken
      )

      if (!userIsRegistered) {
        const firstName = appleCredential?.fullName?.givenName!
        const lastName = appleCredential?.fullName?.familyName!

        setIsLoading(false)

        return navigation.navigate('Social Sign Up', {
          id: user.uid,
          email: user.email || '',
          firstName,
          lastName,
          provider: 'google',
          profileImageUrl: user.photoURL || '',
          authToken
        })
      }

      await dispatch(loginUser(user.uid, authToken))

      setIsLoading(false)
    } catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        setIsLoading(false)
      } else {
        setIsLoading(false)

        console.error(error)

        return showError(
          'Algo deu errado. Por favor, tente novamente mais tarde.'
        )
      }
    }
  }

  return (
    <>
      {isLoading && <Loading />}

      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={
          AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
        }
        cornerRadius={50}
        style={{
          width: '100%',
          height: 35,
          marginTop: 7.5
        }}
        onPress={handlePress}
      />
    </>
  )
}

export default SignInWithAppleButton
