import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import ChampionshipBasicInfoScreen from '~screens/app/championships/new-championship/basic-info/basic-info.container'
import ChampionshipTrackSelectionScreen from '~screens/app/championships/new-championship/track-selection/track-selection.container'
import ChampionshipRaceDateSelectionScreen from '~screens/app/championships/new-championship/race-date-selection/race-date-selection.container'
import ChampionshipScoringSystemSelectionScreen from '~screens/app/championships/new-championship/scoring-system-selection/scoring-system-selection.container'
import ChampionshipTeamSelectionScreen from '~screens/app/championships/new-championship/team-selection/team-selection.container'
import ChampionshipDriverSelectionScreen from '~screens/app/championships/new-championship/driver-selection/driver-selection.container'

// Utilities
import { NewChampionshipStackParamList } from './new-championship.types'

interface NewChampionshipNavigatorProps {}

const Stack = createNativeStackNavigator<NewChampionshipStackParamList>()

const NewChampionshipNavigator: FunctionComponent<
  NewChampionshipNavigatorProps
> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Championship Teams"
        component={ChampionshipTeamSelectionScreen}
      />
      <Stack.Screen
        component={ChampionshipDriverSelectionScreen}
        name="Championship Drivers"
      />

      <Stack.Screen
        name="Championship Scoring System"
        component={ChampionshipScoringSystemSelectionScreen}
      />
      <Stack.Screen
        name="Championship Basic Info"
        component={ChampionshipBasicInfoScreen}
      />
      <Stack.Screen
        name="Championship Tracks"
        component={ChampionshipTrackSelectionScreen}
      />
      <Stack.Screen
        name="Championship Race Dates"
        component={ChampionshipRaceDateSelectionScreen}
      />
    </Stack.Navigator>
  )
}

export default NewChampionshipNavigator
