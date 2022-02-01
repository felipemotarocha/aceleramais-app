import React, { FunctionComponent } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// Screens
import SignUpScreen, { SignUpFormData } from './sign-up.screen'

// Utilities
import { FirebaseError } from '~types/firebase.types'
import { API_URL } from '~constants/config.constants'
import { emailIsAlreadyInUse } from '~helpers/auth.helpers'

// Redux
import { createUser } from '~store/user/user.actions'

const SignUpContainer: FunctionComponent = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (data: SignUpFormData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      )

      await dispatch(
        createUser({ ...data, id: user.uid, provider: user.providerId })
      )
    } catch ({ message }) {
      if (message === FirebaseError.emailAlreadyInUse) {
        return emailIsAlreadyInUse()
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
