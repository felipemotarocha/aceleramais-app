import React, { FunctionComponent } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import FlashMessage from 'react-native-flash-message'

// Navigators
import AuthStackNavigator from './auth-stack.navigator'
import AppBottomTabNavigator from './app-bottom-navigator'

// Redux
import { useAppSelector } from '~store'

// Redux Actions
import { loginUser, signOutUser } from '~store/user/user.actions'

// Utilities
import { auth } from '~config/firebase.config'
import axios from 'axios'
import { API_URL } from '~constants/config.constants'

interface RootStackNavigatorProps {}

const RootStackNavigator: FunctionComponent<RootStackNavigatorProps> = () => {
  const { currentUser, loading } = useAppSelector((state) => state.user)

  console.log({ loading })

  const dispatch = useDispatch()

  onAuthStateChanged(auth, async (user) => {
    if (user && !currentUser && !loading) {
      try {
        await axios.get(`${API_URL}/api/user?id=${user.uid}`)

        const authToken = await user.getIdToken()

        dispatch(loginUser(user.uid, authToken))
      } catch (_err) {}
    }

    if (!user && currentUser) {
      dispatch(signOutUser())
    }
  })

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
