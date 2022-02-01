import React, { FunctionComponent } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

import ForgotPasswordScreen from './forgot-password.screen'

// Utilities
import { FirebaseError } from '~types/firebase.types'
import { showSuccess } from '~helpers/flash-message.helpers'
import { invalidCredentials } from '~helpers/auth.helpers'

const ForgotPasswordContainer: FunctionComponent = () => {
  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await sendPasswordResetEmail(getAuth(), email)

      showSuccess(
        'Um e-mail com instruções para recuperar a sua senha foi enviado para você!'
      )
    } catch ({ code }) {
      if (code === FirebaseError.userNotFound) {
        return invalidCredentials()
      }
    }
  }
  return <ForgotPasswordScreen handleSubmit={handleSubmit} />
}

export default ForgotPasswordContainer
