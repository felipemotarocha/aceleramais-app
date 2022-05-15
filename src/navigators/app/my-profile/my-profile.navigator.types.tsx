import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUpScreenDefaultValues } from '~navigators/auth/auth-stack.navigator.types'

export type UserStackParamList = {
  'User Profile': { userName: string }
  'Sign Up': {
    defaultValues?: SignUpScreenDefaultValues
    isEdit: boolean
  }
}

export type UserProfileScreenRouteProp = RouteProp<
  UserStackParamList,
  'User Profile'
>

export type UserProfileScreenNavigationProp = NativeStackNavigationProp<
  UserStackParamList,
  'User Profile'
>
