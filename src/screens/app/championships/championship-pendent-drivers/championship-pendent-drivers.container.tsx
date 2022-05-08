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
import {
  ChampionshipPendentDriver,
  PendentDriverStatus,
  updateChampionshipPendentDrivers
} from '~store/championship-pendent-drivers/championship-pendent-drivers.slice'
import User from '~types/user.types'

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

  const handleApprovePress = useCallback(
    (driver: ChampionshipPendentDriver) => {
      const newPendentDrivers = pendentDrivers.map((item) =>
        (item.user as User).id === (driver.user as User).id
          ? { ...item, status: 'approved' as PendentDriverStatus }
          : item
      )

      dispatch(updateChampionshipPendentDrivers(newPendentDrivers))
    },
    [dispatch, pendentDrivers]
  )

  const handleReprovePress = useCallback(
    (driver: ChampionshipPendentDriver) => {
      const newPendentDrivers = pendentDrivers.map((item) =>
        (item.user as User).id === (driver.user as User).id
          ? { ...item, status: 'reproved' as PendentDriverStatus }
          : item
      )

      dispatch(updateChampionshipPendentDrivers(newPendentDrivers))
    },
    [dispatch, pendentDrivers]
  )

  const handleUndoPress = useCallback(
    (driver: ChampionshipPendentDriver) => {
      const newPendentDrivers = pendentDrivers.map((item) =>
        (item.user as User).id === (driver.user as User).id
          ? { ...item, status: 'none' as PendentDriverStatus }
          : item
      )

      dispatch(updateChampionshipPendentDrivers(newPendentDrivers))
    },
    [dispatch, pendentDrivers]
  )

  const renderItem = useCallback(
    ({ item }: { item: ChampionshipPendentDriver }) => (
      <View style={{ marginTop: 20 }}>
        <ChampionshipPendentDriverItem
          pendentDriver={item}
          handleApprovePress={handleApprovePress}
          handleReprovePress={handleReprovePress}
          handleUndoPress={handleUndoPress}
        />
      </View>
    ),
    [handleApprovePress, handleReprovePress, handleUndoPress]
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
