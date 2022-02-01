import React, { FunctionComponent } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

import SignInScreen, { SignInFormData } from './sign-in.screen'

// Utilities
import { invalidCredentials } from '~helpers/auth.helpers'
import { FirebaseError } from '~types/firebase.types'
import { loginUser } from '~store/user/user.actions'
import { SignInScreenNavigationProp } from '~navigators/auth/auth-stack.navigator.types'

// Redux
import { useAppDispatch } from '~store'

interface SignInContainerProps {}

const SignInContainer: FunctionComponent<SignInContainerProps> = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<SignInScreenNavigationProp>()

  const handleSubmit = async (data: SignInFormData) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      )

      const authToken = await user.getIdToken()

      await dispatch(loginUser(user.uid, authToken))
    } catch ({ message }) {
      if (message === FirebaseError.userNotFound) {
        return invalidCredentials()
      }
    }
  }

  const handleForgotMyPasswordPress = () =>
    navigation.navigate('Forgot My Password')

  return (
    <SignInScreen
      handleSubmit={handleSubmit}
      handleForgotMyPasswordPress={handleForgotMyPasswordPress}
    />
  )
}

export default SignInContainer
