/* eslint-disable camelcase */
import React from 'react'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { Provider } from 'react-redux'

import 'src/config/firebase.config'

import AuthStackNavigator from '~navigators/auth/auth-stack.navigator'
import store from '~store'

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <AuthStackNavigator />
    </Provider>
  )
}

export default App
