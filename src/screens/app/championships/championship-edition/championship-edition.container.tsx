import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'

// Screens
import ChampionshipEditionScreen from './championship-edition.screen'

// Utilities
import {
  ChampionshipEditionScreenRouteProp,
  ChampionshipEditionScreenNavigationProp
} from '~navigators/app/championships/championships.navigator.types'
import api from '~api/axios.api'
import ChampionshipEditionHelpers from './championship-edition.helpers'

// Redux
import { useAppDispatch } from '~store'
import {
  clear,
  replace
} from '~store/championship-creation/championship-creation.slice'

interface ChampionshipEditionContainerProps {}

export type Button = 'raceResults' | 'detailsAndSettings' | 'pendentDrivers'

const ChampionshipEditionContainer: React.FunctionComponent<
  ChampionshipEditionContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipEditionScreenRouteProp>()
  const navigation = useNavigation<ChampionshipEditionScreenNavigationProp>()

  const dispatch = useAppDispatch()

  const handleEditDetailsAndSettingsPress = async () => {
    const { data } = await api.get(
      `/api/championship/${championship}?full_populate=true`
    )

    const reducerData = ChampionshipEditionHelpers.generateReducerData(data)

    dispatch(
      replace({
        ...reducerData,
        tracks: [],
        pendentDrivers: [],
        isEdit: true,
        loading: false,
        error: undefined
      })
    )

    navigation.navigate('New Championship')
  }

  const handlePendentDriversPress = () =>
    navigation.navigate('Championship Pendent Drivers', { championship })

  const handlePress = useCallback(
    (button: Button) => {
      return {
        raceResults: () =>
          navigation.navigate('Championship Race Selection', { championship }),
        detailsAndSettings: handleEditDetailsAndSettingsPress,
        pendentDrivers: handlePendentDriversPress
      }[button]
    },
    [championship, navigation, handleEditDetailsAndSettingsPress]
  )

  useEffect(() => {
    return () => {
      dispatch(clear())
    }
  }, [dispatch])

  return <ChampionshipEditionScreen handlePress={handlePress} />
}

export default ChampionshipEditionContainer
