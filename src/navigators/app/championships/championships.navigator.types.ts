import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type ChampionshipsStackParamList = {
  'Championship List': undefined
  'New Championship': undefined
}

export type ChampionshipListScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'Championship List'
>
export type NewChampionshipScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'New Championship'
>

export type ChampionshipListScreenNavigationProp = NativeStackNavigationProp<
  ChampionshipsStackParamList,
  'Championship List'
>
export type NewChampionshipScreenNavigationProp = NativeStackNavigationProp<
  ChampionshipsStackParamList,
  'New Championship'
>
