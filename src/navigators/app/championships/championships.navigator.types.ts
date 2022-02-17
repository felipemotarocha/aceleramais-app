import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type ChampionshipsStackParamList = {
  'Championship List': undefined
  'New Championship': undefined
  'Championship Details': { championship: string }
}

export type ChampionshipListScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'Championship List'
>
export type NewChampionshipScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'New Championship'
>
export type ChampionshipDetailsScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'Championship Details'
>

export type ChampionshipListScreenNavigationProp = NativeStackNavigationProp<
  ChampionshipsStackParamList,
  'Championship List'
>
export type NewChampionshipScreenNavigationProp = NativeStackNavigationProp<
  ChampionshipsStackParamList,
  'New Championship'
>
export type ChampionshipDetailsScreenNavigationProp = NativeStackNavigationProp<
  ChampionshipsStackParamList,
  'Championship Details'
>
