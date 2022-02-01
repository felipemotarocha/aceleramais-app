import React, { FunctionComponent } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { useAppDispatch } from '~store'

import SignInScreen, { SignInFormData } from './sign-in.screen'
import { loginUser } from '~store/user/user.actions'

interface SignInContainerProps {}

const SignInContainer: FunctionComponent<SignInContainerProps> = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: SignInFormData) => {
    const { user } = await signInWithEmailAndPassword(
      getAuth(),
      data.email,
      data.password
    )

    const authToken = await user.getIdToken()

    await dispatch(loginUser(user.uid, authToken))
  }

  return <SignInScreen handleSubmit={handleSubmit} />
}

export default SignInContainer
