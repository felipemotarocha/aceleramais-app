import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// Screens
import WelcomeScreen from '~screens/auth/welcome/welcome.container'
import SignUpScreen from '~screens/auth/sign-up/sign-up.container'

// Utilities
import { AuthStackParamList } from './auth-stack.navigator.types'

interface AuthStackNavigatorProps {}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator: FunctionComponent<AuthStackNavigatorProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStackNavigator
