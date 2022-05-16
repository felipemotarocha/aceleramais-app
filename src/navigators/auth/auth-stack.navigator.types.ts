import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type SignUpScreenDefaultValues = {
  id: string
  firstName: string
  lastName: string
  email: string
  userName: string
  profileImageUrl?: string
  biography?: string
}

export type AuthStackParamList = {
  Welcome: undefined
  'Sign In': undefined
  'Sign Up': {
    defaultValues?: SignUpScreenDefaultValues
    isEdit: boolean
  }
  'Forgot My Password': undefined
  'Social Sign Up': {
    id: string
    firstName: string
    lastName: string
    email: string
    provider: string
    authToken: string
    profileImageUrl?: string
  }
}

export type WelcomeScreenRouteProp = RouteProp<AuthStackParamList, 'Welcome'>
export type SignInScreenRouteProp = RouteProp<AuthStackParamList, 'Sign In'>
export type SignUpScreenRouteProp = RouteProp<AuthStackParamList, 'Sign Up'>
export type ForgotMyPasswordScreenRouteProp = RouteProp<
  AuthStackParamList,
  'Forgot My Password'
>
export type SocialSignUpScreenRouteProp = RouteProp<
  AuthStackParamList,
  'Social Sign Up'
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
export type SocialSignUpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Social Sign Up'
>
