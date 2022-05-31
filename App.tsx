/* eslint-disable camelcase */
import React, { useState } from 'react'

import 'react-native-gesture-handler'
import 'react-native-reanimated'

import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { Provider } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

import store from '~store'
import RootStackNavigator from '~navigators/root/root-stack.navigator'
import { auth } from 'src/config/firebase.config'

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  onAuthStateChanged(auth, async (user) => {
    if (user != null) {
      const authToken = await user.getIdToken()

      await AsyncStorage.setItem('authToken', authToken)
      await AsyncStorage.setItem('userId', user.uid)

      return setIsInitializing(false)
    }

    await AsyncStorage.multiRemove(['authToken', 'userId'])
    setIsInitializing(false)
  })

  if (!fontsLoaded || isInitializing) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  )
}

export default App
