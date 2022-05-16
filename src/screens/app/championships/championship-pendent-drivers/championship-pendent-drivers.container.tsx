import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

// Screens
import ChampionshipPendentDriversScreen from './championship-pendent-drivers.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  getChampionshipPendentDrivers,
  submitChampionshipPendentDriversEdition
} from '~store/championship-pendent-drivers/championship-pendent-drivers.actions'

// Utilities
import {
  ChampionshipPendentDriversScreenNavigationProp,
  ChampionshipPendentDriversScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'
import {
  ChampionshipPendentDriver,
  PendentDriverStatus,
  updateChampionshipPendentDrivers
} from '~store/championship-pendent-drivers/championship-pendent-drivers.slice'
import User from '~types/user.types'
import ChampionshipHelpers from '~helpers/championship.helpers'
import api from '~api/axios.api'
import { ChampionshipDriver } from '~types/championship.types'
import { showError, showSuccess } from '~helpers/flash-message.helpers'

// Components
import ChampionshipPendentDriverItem from '~components/championship-pendent-driver-item/championship-pendent-driver-item.component'
import Loading from '~components/common/loading/loading.component'

interface ChampionshipPendentDriversContainerProps {}

const ChampionshipPendentDriversContainer: FunctionComponent<
  ChampionshipPendentDriversContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipPendentDriversScreenRouteProp>()

  const dispatch = useAppDispatch()

  const { loading, submitIsLoading, pendentDrivers } = useAppSelector(
    (state) => state.championshipPendentDrivers
  )

  const navigation =
    useNavigation<ChampionshipPendentDriversScreenNavigationProp>()

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

  const handleSubmit = async () => {
    try {
      const { data } = await api.get(
        `/api/championship/${championship}?full_populate=true`
      )

      const newPendentDrivers = pendentDrivers.filter(
        (driver) => driver.status === 'none'
      )

      const newDrivers: ChampionshipDriver[] = [
        ...data.drivers,
        ...pendentDrivers
          .filter((driver) => driver.status === 'approved')
          .map((driver) => ({
            ...driver,
            bonifications: [],
            penalties: [],
            isRegistered: true,
            isRemoved: false
          }))
      ]

      console.log(
        JSON.stringify({
          ...data,
          drivers: newDrivers,
          pendentDrivers: newPendentDrivers
        })
      )

      const payload = ChampionshipHelpers.convertChampionshipToUpsertPayload({
        ...data,
        drivers: newDrivers,
        pendentDrivers: newPendentDrivers
      })

      console.log(JSON.stringify(payload))

      await dispatch(
        submitChampionshipPendentDriversEdition(championship, payload)
      )

      navigation.goBack()

      showSuccess('As modificações foram salvas com sucesso!')
    } catch (_err) {
      showError(
        'Algo deu errado. Por favor, tente novamente mais tarde ou entre em contato conosco.'
      )
    }
  }

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
    <>
      {submitIsLoading && <Loading />}

      <ChampionshipPendentDriversScreen
        refreshing={loading}
        pendentDrivers={pendentDrivers}
        refetch={() => dispatch(getChampionshipPendentDrivers(championship))}
        renderItem={renderItem}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default ChampionshipPendentDriversContainer
