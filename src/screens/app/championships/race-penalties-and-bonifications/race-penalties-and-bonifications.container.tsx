import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'

// Screens
import RacePenaltiesAndBonificationsScreen from './race-penalties-and-bonifications.screen'

// Utilities
import { RacePenaltiesAndBonificationsScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import {
  Bonification,
  ChampionshipDriver,
  Penalty
} from '~types/championship.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionshipDrivers } from '~store/race-penalties-and-bonifications/race-penalties-and-bonifications.actions'

interface PenaltiesAndBonificationsContainerProps {}

const RacePenaltiesAndBonificationsContainer: FunctionComponent<
  PenaltiesAndBonificationsContainerProps
> = () => {
  const dispatch = useAppDispatch()

  const route = useRoute<RacePenaltiesAndBonificationsScreenRouteProp>()

  const { championshipDrivers } = useAppSelector(
    (state) => state.racePenaltiesAndBonifications
  )

  const fetchChampionshipDrivers = async () => {
    await dispatch(getChampionshipDrivers(route.params.championship))
  }

  const bonifications = useMemo(() => {
    const race = route.params.race

    const _bonifications: {
      driver: ChampionshipDriver
      bonification: Bonification
    }[] = []

    if (isEmpty(championshipDrivers)) return []

    for (const driver of championshipDrivers) {
      if (isEmpty(driver.bonifications)) continue

      for (const bonification of driver.bonifications!) {
        if (bonification.race !== race) continue

        const { penalties, bonifications, ...rest } = driver

        _bonifications.push({
          driver: rest,
          bonification: bonification.bonification
        })
      }
    }

    return _bonifications
  }, [championshipDrivers, route])

  const penalties = useMemo(() => {
    const race = route.params.race

    const _penalties: {
      driver: ChampionshipDriver
      penalty: Penalty
    }[] = []

    for (const driver of championshipDrivers) {
      if (isEmpty(driver.penalties)) continue

      for (const penalty of driver.penalties!) {
        if (penalty.race !== race) continue

        const { penalties, bonifications, ...rest } = driver

        _penalties.push({
          driver: rest,
          penalty: penalty.penalty
        })
      }
    }

    return _penalties
  }, [championshipDrivers, route])

  console.log({ penalties, bonifications })

  useEffect(() => {
    fetchChampionshipDrivers()
  }, [])

  return <RacePenaltiesAndBonificationsScreen />
}

export default RacePenaltiesAndBonificationsContainer
