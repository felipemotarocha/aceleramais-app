import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent, useCallback } from 'react'

import { WelcomeScreenNavigationProp } from '~navigators/auth/auth-stack.navigator.types'

import WelcomeScreen from './welcome.screen'

interface WelcomeScreenContainerProps {}

const WelcomeScreenContainer: FunctionComponent<
  WelcomeScreenContainerProps
> = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>()

  const handleSignUpPress = useCallback(
    () => navigation.navigate('Sign Up', { isEdit: false }),
    [navigation]
  )

  const handleSignInWithEmailAndPasswordPress = useCallback(
    () => navigation.navigate('Sign In'),
    [navigation]
  )

  return (
    <WelcomeScreen
      handleSignUpPress={handleSignUpPress}
      handleSignInWithEmailAndPasswordPress={
        handleSignInWithEmailAndPasswordPress
      }
    />
  )
}

export default WelcomeScreenContainer
