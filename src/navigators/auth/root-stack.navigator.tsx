import React, { FunctionComponent, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getAuth } from 'firebase/auth'

// Navigators
import AuthStackNavigator from './auth-stack.navigator'
import AppBottomTabNavigator from './app-bottom-navigator'

// Redux
import { useAppSelector } from '~store'

// Redux Actions
import { loginUser, signOutUser } from '~store/user/user.actions'

interface RootStackNavigatorProps {}

const RootStackNavigator: FunctionComponent<RootStackNavigatorProps> = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  const dispatch = useDispatch()

  const auth = getAuth()

  useEffect(() => {
    const refreshAuth = async () => {
      const user = auth.currentUser

      if (user && !currentUser.data) {
        const authToken = await user.getIdToken()

        return dispatch(loginUser({ id: user.uid, authToken }))
      }

      if (!user && currentUser.data) {
        return dispatch(signOutUser())
      }
    }

    refreshAuth()
  }, [auth])

  return (
    <NavigationContainer>
      {currentUser.data ? <AppBottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default RootStackNavigator
