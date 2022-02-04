import React, { FunctionComponent } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

// Screens
import SignInScreen, { SignInFormData } from './sign-in.screen'

// Utilities
import { invalidCredentials, tooManyFailedAttemps } from '~helpers/auth.helpers'
import { FirebaseError } from '~types/firebase.types'
import { SignInScreenNavigationProp } from '~navigators/auth/auth-stack.navigator.types'
import { auth } from '~config/firebase.config'

// Redux
import { loginUser } from '~store/user/user.actions'

// Redux

const SignInContainer: FunctionComponent = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>()
  const dispatch = useDispatch()

  const handleSubmit = async (data: SignInFormData) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      const authToken = await user.getIdToken()

      await dispatch(loginUser(user.uid, authToken))
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
