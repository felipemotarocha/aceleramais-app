import * as React from 'react'
import { useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'

// Screens
import ChampionshipEditionScreen from './championship-edition.screen'

// Utilities
import {
  ChampionshipEditionScreenRouteProp,
  ChampionshipEditionScreenNavigationProp
} from '~navigators/app/championships/championships.navigator.types'

interface ChampionshipEditionContainerProps {}

export type Button = 'raceResults'

const ChampionshipEditionContainer: React.FunctionComponent<
  ChampionshipEditionContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipEditionScreenRouteProp>()
  const navigation = useNavigation<ChampionshipEditionScreenNavigationProp>()

  const handlePress = useCallback(
    (button: Button) => {
      return {
        raceResults: () =>
          navigation.navigate('Championship Race Selection', { championship })
      }[button]
    },
    [championship, navigation]
  )

  return <ChampionshipEditionScreen handlePress={handlePress} />
}

export default ChampionshipEditionContainer
