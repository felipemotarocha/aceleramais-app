import React, { FunctionComponent } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'

// Screens
import SignUpScreen, { SignUpFormData } from './sign-up.screen'

// Redux
import { createUser, loginUser } from '~store/user/user.actions'

interface SignUpContainerProps {}

const SignUpContainer: FunctionComponent<SignUpContainerProps> = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (data: SignUpFormData) => {
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
  }
  return <SignUpScreen handleSubmit={handleSubmit} />
}

export default SignUpContainer
