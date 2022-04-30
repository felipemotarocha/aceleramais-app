import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import ChampionshipListScreen from '~screens/app/championships/championship-list/championship-list.container'
import ChampionshipDetailsScreen from '~screens/app/championships/championship-details/championship-details.container'
import ChampionshipRacesScreen from '~screens/app/championships/championship-races/championship-races.container'
import ChampionshipDriverStandingsScreen from '~screens/app/championships/championship-driver-standings/championship-driver-standings.container'
import ChampionshipTeamStandingsScreen from '~screens/app/championships/championship-team-standings/championship-team-standings.container'
import ChampionshipEditionScreen from '~screens/app/championships/championship-edition/championship-edition.container'
import ChampionshipRaceSelectionScreen from '~screens/app/championships/championship-race-selection/championship-race-selection.container'
import RaceClassificationScreen from '~screens/app/championships/race-classification/race-classification.container'
import RacePenaltiesAndBonificationsScreen from '~screens/app/championships/race-penalties-and-bonifications/race-penalties-and-bonifications.container'
import PenaltyOrBonificationDriverSelectionScreen from '~screens/app/championships/add-penalty-or-bonification/driver-selection/driver-selection.container'
import PenaltyOrBonificationSelectionScreen from '~screens/app/championships/add-penalty-or-bonification/penalty-or-bonification-selection/penalty-or-bonification-selection.container'
import SearchScreen from '~screens/app/search/search/search.container'

interface SearchNavigatorProps {}

const Stack = createNativeStackNavigator()

const SearchNavigator: FunctionComponent<SearchNavigatorProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Search Championships and Users"
        component={SearchScreen}
      />

      <Stack.Screen
        name="Championship List"
        component={ChampionshipListScreen}
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
      <Stack.Screen
        name="Championship Edition"
        component={ChampionshipEditionScreen}
      />
      <Stack.Screen
        name="Championship Race Selection"
        component={ChampionshipRaceSelectionScreen}
      />
      <Stack.Screen
        name="Race Classification"
        component={RaceClassificationScreen}
      />
      <Stack.Screen
        name="Race Penalties and Bonifications Edition"
        component={RacePenaltiesAndBonificationsScreen}
      />
      <Stack.Screen
        name="Penalty or Bonification Driver Selection"
        component={PenaltyOrBonificationDriverSelectionScreen}
      />
      <Stack.Screen
        name="Penalty or Bonification Selection"
        component={PenaltyOrBonificationSelectionScreen}
      />
    </Stack.Navigator>
  )
}

export default SearchNavigator
