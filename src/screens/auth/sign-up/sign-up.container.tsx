import React, { FunctionComponent } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'

import SignUpScreen, { SignUpFormData } from './sign-up.screen'
import { createUser } from '~store/user/user.actions'

interface SignUpContainerProps {}

const SignUpContainer: FunctionComponent<SignUpContainerProps> = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (data: SignUpFormData) => {
    const { user } = await createUserWithEmailAndPassword(
      getAuth(),
      data.email,
      data.password
    )

    dispatch(createUser({ ...data, id: user.uid, provider: user.providerId }))
  }
  return <SignUpScreen handleSubmit={handleSubmit} />
}

export default SignUpContainer
