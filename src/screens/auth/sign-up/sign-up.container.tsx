import React, { FunctionComponent } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

import SignUpScreen, { SignUpFormData } from './sign-up.screen'

interface SignUpContainerProps {}

const SignUpContainer: FunctionComponent<SignUpContainerProps> = () => {
  const handleSubmit = async (data: SignUpFormData) => {
    console.log({ data })
    const { user } = await createUserWithEmailAndPassword(
      getAuth(),
      data.email,
      data.password
    )

    console.log({ user })
  }
  return <SignUpScreen handleSubmit={handleSubmit} />
}

export default SignUpContainer
