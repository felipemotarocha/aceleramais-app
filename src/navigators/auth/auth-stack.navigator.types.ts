import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AuthStackParamList = {
  Welcome: undefined
  'Sign In': undefined
  'Sign Up': undefined
  'Forgot My Password': undefined
}

export type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, 'Welcome'>
export type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'Sign In'>
export type SignUpScreenRouteProp = RouteProp<AuthStackParamList, 'Sign Up'>
export type ForgotMyPasswordScreenRouteProp = RouteProp<
  AuthStackParamList,
  'Forgot My Password'
>

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
export type ForgotMyPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Forgot My Password'
>
