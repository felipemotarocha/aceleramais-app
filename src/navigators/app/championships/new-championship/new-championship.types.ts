import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type NewChampionshipStackParamList = {
  'Championship Basic Info': undefined
  'Championship Tracks': undefined
  'Championship Race Dates': undefined
  'Championship Scoring System': undefined
  'Championship Teams': undefined
  'Championship Drivers': undefined
  'Championship Bonifications': undefined
}

export type ChampionshipBasicInfoScreenRouteProp = RouteProp<
  NewChampionshipStackParamList,
  'Championship Basic Info'
>
export type ChampionshipBasicInfoScreenNavigationProp =
  NativeStackNavigationProp<
    NewChampionshipStackParamList,
    'Championship Basic Info'
  >
export type ChampionshipTeamsScreenNavigationProp = NativeStackNavigationProp<
  NewChampionshipStackParamList,
  'Championship Teams'
>

export type ChampionshipRaceDatesScreenRouteProp = RouteProp<
  NewChampionshipStackParamList,
  'Championship Race Dates'
>
export type ChampionshipRaceDatesScreenNavigationProp =
  NativeStackNavigationProp<
    NewChampionshipStackParamList,
    'Championship Race Dates'
  >
export type ChampionshiTeamsScreenNavigationProp = NativeStackNavigationProp<
  NewChampionshipStackParamList,
  'Championship Teams'
>
