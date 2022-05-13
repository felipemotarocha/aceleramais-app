import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type UserStackParamList = {
  'User Profile': { user: string }
}

export type UserProfileScreenRouteProp = RouteProp<
  UserStackParamList,
  'User Profile'
>

export type UserProfileScreenNavigationProp = NativeStackNavigationProp<
  UserStackParamList,
  'User Profile'
>
