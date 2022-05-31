import React, { FunctionComponent, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppLoading from 'expo-app-loading'

// Navigators
import AuthStackNavigator from '../auth/auth-stack.navigator'
import AppBottomTabNavigator from '../app/app-bottom-navigator'

// Redux
import { useAppSelector } from '~store'

// Redux Actions
import { loginUser } from '~store/user/user.actions'

interface RootStackNavigatorProps {}

const RootStackNavigator: FunctionComponent<RootStackNavigatorProps> = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const { currentUser } = useAppSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const initUserSession = async () => {
      const authToken = await AsyncStorage.getItem('authToken')
      const userId = await AsyncStorage.getItem('userId')

      if (!authToken || !userId) return setIsInitializing(false)

      await dispatch(loginUser(userId, authToken))

      setIsInitializing(false)
    }

    initUserSession()
  }, [dispatch])

  if (isInitializing) return <AppLoading />

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
