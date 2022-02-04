import React, { FunctionComponent, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Navigators
import AuthStackNavigator from '../auth/auth-stack.navigator'
import AppBottomTabNavigator from '../app/app-bottom-navigator'

// Redux
import { useAppSelector } from '~store'

// Redux Actions
import { loginUser } from '~store/user/user.actions'

interface RootStackNavigatorProps {}

const RootStackNavigator: FunctionComponent<RootStackNavigatorProps> = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const initUserSession = async () => {
      const authToken = await AsyncStorage.getItem('authToken')
      const userId = await AsyncStorage.getItem('userId')

      if (!authToken || !userId) return

      await dispatch(loginUser(userId, authToken))
    }

    initUserSession()
  }, [dispatch])

  return (
    <NavigationContainer>
      {currentUser ? <AppBottomTabNavigator /> : <AuthStackNavigator />}
      <FlashMessage
        position="bottom"
        textStyle={{ fontFamily: 'Poppins_600SemiBold' }}
      />
    </NavigationContainer>
  )
}

export default RootStackNavigator
