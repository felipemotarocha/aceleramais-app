import React, { FunctionComponent } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

import SignInScreen, { SignInFormData } from './sign-in.screen'

// Utilities
import { invalidCredentials } from '~helpers/auth.helpers'
import { FirebaseError } from '~types/firebase.types'
import { SignInScreenNavigationProp } from '~navigators/auth/auth-stack.navigator.types'

// Redux

const SignInContainer: FunctionComponent = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>()

  const handleSubmit = async (data: SignInFormData) => {
    try {
      await signInWithEmailAndPassword(getAuth(), data.email, data.password)
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
