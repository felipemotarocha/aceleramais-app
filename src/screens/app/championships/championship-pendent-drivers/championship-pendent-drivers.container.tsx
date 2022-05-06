import React, { FunctionComponent, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

// Screens
import ChampionshipPendentDriversScreen from './championship-pendent-drivers.screen'

// Redux
import { useAppDispatch } from '~store'
import { getChampionshipPendentDrivers } from '~store/championship-pendent-drivers/championship-pendent-drivers.actions'

// Utilities
import { ChampionshipPendentDriversScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'

interface ChampionshipPendentDriversContainerProps {}

const ChampionshipPendentDriversContainer: FunctionComponent<
  ChampionshipPendentDriversContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipPendentDriversScreenRouteProp>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getChampionshipPendentDrivers(championship))
  }, [dispatch])

  return <ChampionshipPendentDriversScreen />
}

export default ChampionshipPendentDriversContainer
