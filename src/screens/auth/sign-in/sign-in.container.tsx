import React, { FunctionComponent } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

import SignInScreen, { SignInFormData } from './sign-in.screen'

// Utilities
import { invalidCredentials, tooManyFailedAttemps } from '~helpers/auth.helpers'
import { FirebaseError } from '~types/firebase.types'
import { SignInScreenNavigationProp } from '~navigators/auth/auth-stack.navigator.types'
import { auth } from '~config/firebase.config'

// Redux

const SignInContainer: FunctionComponent = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>()

  const handleSubmit = async (data: SignInFormData) => {
    try {
      return await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch ({ code }) {
      if (code === FirebaseError.userNotFound) {
        return invalidCredentials()
      }

      if (code === FirebaseError.invalidCredentials) {
        return invalidCredentials()
      }

      if (code === FirebaseError.tooManyFailedAttemps) {
        return tooManyFailedAttemps()
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
