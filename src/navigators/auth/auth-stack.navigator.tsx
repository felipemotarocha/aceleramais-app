import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import WelcomeScreen from '~screens/auth/welcome/welcome.container'
import SignUpScreen from '~screens/auth/sign-up/sign-up.container'
import SignInScreen from '~screens/auth/sign-in/sign-in.container'
import ForgotPasswordScreen from '~screens/auth/forgot-password/forgot-password.container'

// Utilities
import { AuthStackParamList } from './auth-stack.navigator.types'

interface AuthStackNavigatorProps {}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator: FunctionComponent<AuthStackNavigatorProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen
        name="Forgot My Password"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator
