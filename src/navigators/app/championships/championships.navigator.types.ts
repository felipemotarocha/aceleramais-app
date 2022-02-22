import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type ChampionshipsStackParamList = {
  'Championship List': undefined
  'New Championship': undefined
  'Championship Details': { championship: string }
  'Championship Races': { championship: string }
  'Championship Driver Standings': { championship: string }
  'Championship Team Standings': { championship: string }
  'Championship Edition': { championship: string }
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
export type ChampionshipRacesScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'Championship Races'
>
export type ChampionshipDriverStandingsScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'Championship Driver Standings'
>
export type ChampionshipTeamStandingsScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'Championship Team Standings'
>
export type ChampionshipEditionScreenRouteProp = RouteProp<
  ChampionshipsStackParamList,
  'Championship Edition'
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
export type ChampionshipRacesScreenNavigationProp = NativeStackNavigationProp<
  ChampionshipsStackParamList,
  'Championship Races'
>
export type ChampionshipDriverStandingsScreenNavigationProp =
  NativeStackNavigationProp<
    ChampionshipsStackParamList,
    'Championship Driver Standings'
  >
export type ChampionshipTeamStandingsScreenNavigationProp =
  NativeStackNavigationProp<
    ChampionshipsStackParamList,
    'Championship Team Standings'
  >
export type ChampionshipEditionScreenNavigationProp = NativeStackNavigationProp<
  ChampionshipsStackParamList,
  'Championship Edition'
>
