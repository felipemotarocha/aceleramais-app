import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'

// Screens
import ChampionshipPendentDriversScreen from './championship-pendent-drivers.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionshipPendentDrivers } from '~store/championship-pendent-drivers/championship-pendent-drivers.actions'

// Utilities
import { ChampionshipPendentDriversScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import { ChampionshipPendentDriver } from '~store/championship-pendent-drivers/championship-pendent-drivers.slice'

// Components
import ChampionshipPendentDriverItem from '~components/championship-pendent-driver-item/championship-pendent-driver-item.component'

interface ChampionshipPendentDriversContainerProps {}

const ChampionshipPendentDriversContainer: FunctionComponent<
  ChampionshipPendentDriversContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipPendentDriversScreenRouteProp>()

  const dispatch = useAppDispatch()

  const { loading, pendentDrivers } = useAppSelector(
    (state) => state.championshipPendentDrivers
  )

  useEffect(() => {
    dispatch(getChampionshipPendentDrivers(championship))
  }, [dispatch])

  const renderItem = useCallback(
    ({ item }: { item: ChampionshipPendentDriver }) => (
      <View style={{ marginTop: 20 }}>
        <ChampionshipPendentDriverItem pendentDriver={item} />
      </View>
    ),
    []
  )

  return (
    <ChampionshipPendentDriversScreen
      refreshing={loading}
      pendentDrivers={pendentDrivers}
      refetch={() => dispatch(getChampionshipPendentDrivers(championship))}
      renderItem={renderItem}
    />
  )
}

export default ChampionshipPendentDriversContainer
