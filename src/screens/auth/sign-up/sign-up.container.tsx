import React, { FunctionComponent } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'

// Screens
import SignUpScreen, { SignUpFormData } from './sign-up.screen'

// Redux
import { createUser, loginUser } from '~store/user/user.actions'
import { FirebaseError } from '~types/firebase.types'
import { emailAlreadyInUseError } from './sign-up.errors'
import axios from 'axios'
import { API_URL } from '~constants/config.constants'

interface SignUpContainerProps {}

const SignUpContainer: FunctionComponent<SignUpContainerProps> = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      )

      const authToken = await user.getIdToken()

      await dispatch(
        createUser({ ...data, id: user.uid, provider: user.providerId })
      )

      await dispatch(loginUser(user.uid, authToken))
    } catch ({ message }) {
      if (message === FirebaseError.emailAlreadyInUse) {
        return emailAlreadyInUseError()
      }
    }
  }

  const checkIfUsernameAlreadyExists = async (userName: string) => {
    try {
      await axios.get(`${API_URL}/api/user?userName=${userName}`)

      return false
    } catch (_) {
      return true
    }
  }

  return (
    <SignUpScreen
      handleSubmit={handleSubmit}
      checkIfUsernameAlreadyExists={checkIfUsernameAlreadyExists}
    />
  )
}

export default SignUpContainer
