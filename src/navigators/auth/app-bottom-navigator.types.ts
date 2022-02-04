import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type AppTabBottomParamList = {
  Championships: undefined
  Search: undefined
  'My Profile': undefined
}

export type ChampionshipsScreenRouteProp = RouteProp<
  AppTabBottomParamList,
  'Championships'
>
export type SearchScreenRouteProp = RouteProp<AppTabBottomParamList, 'Search'>
export type MyProfileScreenRouteProp = RouteProp<
  AppTabBottomParamList,
  'My Profile'
>

export type ChampionshipsScreenNavigationProp = NativeStackNavigationProp<
  AppTabBottomParamList,
  'Championships'
>
export type SearchScreenNavigationProp = NativeStackNavigationProp<
  AppTabBottomParamList,
  'Search'
>
export type MyProfileScreenNavigationProp = NativeStackNavigationProp<
  AppTabBottomParamList,
  'My Profile'
>
