import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { PressableProps } from 'react-native'
import {
  signInWithCredential,
  GoogleAuthProvider,
  getAuth
} from 'firebase/auth'
import * as Google from 'expo-auth-session/providers/google'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

// Components
import CustomButton from '../custom-button/custom-button.component'
import Loading from '../loading/loading.component'

// Utilities
import {
  GOOGLE_EXPO_CLIENT_ID,
  ANDROID_CLIENT_ID
} from '~constants/config.constants'
import { checkIfUserIsRegistered } from '~helpers/auth.helpers'
import { loginUser } from '~store/user/user.actions'
import { WelcomeScreenNavigationProp } from '~navigators/auth/auth-stack.navigator.types'

interface SignInWithGoogleButtonProps extends PressableProps {}

const SignInWithGoogleButton: FunctionComponent<SignInWithGoogleButtonProps> = (
  props
) => {
  const [isLoading, setIsLoading] = useState(false)

  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID
  })

  const navigation = useNavigation<WelcomeScreenNavigationProp>()

  const dispatch = useDispatch()

  const handleGoogleAuth = useCallback(
    async (response: any) => {
      const { id_token: idToken } = response.params

      const credential = GoogleAuthProvider.credential(idToken)

      const { user } = await signInWithCredential(getAuth(), credential)

      const authToken = await user.getIdToken()

      const userIsRegistered = await checkIfUserIsRegistered(
        user.uid,
        authToken
      )

      if (!userIsRegistered) {
        const firstName = user?.displayName?.split(' ')[0] || ''
        const lastName = user?.displayName?.split(' ')[1] || ''

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

      setIsLoading(false)

      await dispatch(loginUser(user.uid, authToken))
    },
    [navigation]
  )

  useEffect(() => {
    if (response?.type === 'success') {
      setIsLoading(true)

      handleGoogleAuth(response)
    }
  }, [response, handleGoogleAuth])

  const handlePress = useCallback(() => {
    try {
      promptAsync()
    } catch (error) {
      console.log({ error })
    }
  }, [promptAsync])

  return (
    <>
      {isLoading && <Loading />}
      <CustomButton
        {...props}
        variant="outlined"
        onPress={handlePress}
        disabled={false}>
        Continuar com o Google
      </CustomButton>
    </>
  )
}

export default SignInWithGoogleButton
