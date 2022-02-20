import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screen
import ChampionshipListScreen from '~screens/app/championships/championship-list/championship-list.container'
import ChampionshipDetailsScreen from '~screens/app/championships/championship-details/championship-details.container'
import ChampionshipRacesScreen from '~screens/app/championships/championship-races/championship-races.container'
import ChampionshipDriverStandingsScreen from '~screens/app/championships/championship-driver-standings/championship-driver-standings.container'
import ChampionshipTeamStandingsScreen from '~screens/app/championships/championship-team-standings/championship-team-standings.container'

// Navigators
import NewChampionshipNavigator from './new-championship/new-championship.navigator'

// Utilities
import { ChampionshipsStackParamList } from './championships.navigator.types'

interface ChampionshipsNavigatorProps {}

const Stack = createNativeStackNavigator<ChampionshipsStackParamList>()

const ChampionshipsNavigator: FunctionComponent<
  ChampionshipsNavigatorProps
> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Championship List"
        component={ChampionshipListScreen}
      />
      <Stack.Screen
        name="New Championship"
        component={NewChampionshipNavigator}
      />
      <Stack.Screen
        name="Championship Details"
        component={ChampionshipDetailsScreen}
      />
      <Stack.Screen
        name="Championship Races"
        component={ChampionshipRacesScreen}
      />
      <Stack.Screen
        name="Championship Driver Standings"
        component={ChampionshipDriverStandingsScreen}
      />
      <Stack.Screen
        name="Championship Team Standings"
        component={ChampionshipTeamStandingsScreen}
      />
    </Stack.Navigator>
  )
}

export default ChampionshipsNavigator
