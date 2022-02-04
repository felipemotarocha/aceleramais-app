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
import store from '~store'
import RootStackNavigator from '~navigators/root/root-stack.navigator'

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
      <RootStackNavigator />
    </Provider>
  )
}

export default App
