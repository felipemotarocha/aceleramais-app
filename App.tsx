/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import * as Updates from 'expo-updates'
import { View } from 'react-native'

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

// Utilities
import store from '~store'
import { auth } from 'src/config/firebase.config'
import Colors from '~constants/colors.constants'

// Navigators
import RootStackNavigator from '~navigators/root/root-stack.navigator'

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  useEffect(() => {
    const updateApp = async () => {
      if (Updates.releaseChannel === 'default') return
      const { isAvailable } = await Updates.checkForUpdateAsync()
      if (!isAvailable) return
      await Updates.fetchUpdateAsync()
      await Updates.reloadAsync()
    }
    updateApp()
  }, [])

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
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <RootStackNavigator />
      </View>
    </Provider>
  )
}

export default App
