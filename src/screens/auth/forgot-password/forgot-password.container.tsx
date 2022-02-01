import React, { FunctionComponent } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

import ForgotPasswordScreen from './forgot-password.screen'

// Utilities
import { FirebaseError } from '~types/firebase.types'
import { showError, showSuccess } from '~helpers/flash-message.helpers'

const ForgotPasswordContainer: FunctionComponent = () => {
  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await sendPasswordResetEmail(getAuth(), email)

      showSuccess(
        'Um e-mail com instruções para recuperar a sua senha foi enviado para você!'
      )
    } catch ({ message }) {
      if (message === FirebaseError.userNotFound) {
        return showError('E-mail não encontrado.')
      }
    }
  }
  return <ForgotPasswordScreen handleSubmit={handleSubmit} />
}

export default ForgotPasswordContainer
