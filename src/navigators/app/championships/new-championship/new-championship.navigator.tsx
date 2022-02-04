import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screen
import ChampionshipBasicInfoScreen from '~screens/app/championships/new-championship/basic-info/basic-info.container'

// Utilities
import { NewChampionshipStackParamList } from './new-championship.types'

interface NewChampionshipNavigatorProps {}

const Stack = createNativeStackNavigator<NewChampionshipStackParamList>()

const NewChampionshipNavigator: FunctionComponent<
  NewChampionshipNavigatorProps
> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Championship Basic Info"
        component={ChampionshipBasicInfoScreen}
      />
    </Stack.Navigator>
  )
}

export default NewChampionshipNavigator
