import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screen
import CHampionshipListScreen from '~screens/app/championships/championship-list/championship-list.container'

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
    <Stack.Navigator>
      <Stack.Screen
        name="Championship List"
        component={CHampionshipListScreen}
      />
      <Stack.Screen
        name="New Championship"
        component={NewChampionshipNavigator}
      />
    </Stack.Navigator>
  )
}

export default ChampionshipsNavigator
