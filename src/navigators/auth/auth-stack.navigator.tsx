import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import WelcomeScreen from '~screens/auth/welcome/welcome.container'
import SignUpScreen from '~screens/auth/sign-up/sign-up.container'
import SignInScreen from '~screens/auth/sign-in/sign-in.container'
import ForgotPasswordScreen from '~screens/auth/forgot-password/forgot-password.container'
import SocialSignUp from '~screens/auth/social-sign-up/social-sign-up.container'

// Utilities
import { AuthStackParamList } from './auth-stack.navigator.types'
import Colors from '~constants/colors.constants'

interface AuthStackNavigatorProps {}

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthStackNavigator: FunctionComponent<AuthStackNavigatorProps> = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Social Sign Up" component={SocialSignUp} />
        <Stack.Screen
          name="Forgot My Password"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </View>
  )
}

export default AuthStackNavigator
