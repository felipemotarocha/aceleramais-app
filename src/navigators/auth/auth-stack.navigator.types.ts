import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AuthStackParamList = {
  Welcome: undefined
  'Sign In': undefined
  'Sign Up': undefined
}

export type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, 'Welcome'>
export type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'Sign In'>
export type SignUpScreenRouteProp = RouteProp<AuthStackParamList, 'Sign Up'>

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Welcome'
>
export type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Sign In'
>
export type SignUpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Sign Up'
>
