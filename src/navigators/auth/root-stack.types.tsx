import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Auth: undefined
  Main: undefined
}

export type AuthScreenRouteProp = RouteProp<RootStackParamList, 'Auth'>
export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Sign In'>

export type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>
export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>
