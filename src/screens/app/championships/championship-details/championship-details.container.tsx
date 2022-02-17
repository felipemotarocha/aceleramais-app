import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'

// Screens
import ChampionshipDetailsScreen from './championship-details.screen'

// Utilities
import { ChampionshipDetailsScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionshipDetails } from '~store/championship-details/championship-details-actions'

interface ChampionshipDetailsContainerProps {}

const ChampionshipDetailsContainer: FunctionComponent<
  ChampionshipDetailsContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipDetailsScreenRouteProp>()

  const dispatch = useAppDispatch()

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  useEffect(() => {
    dispatch(getChampionshipDetails(championship))
  }, [dispatch])

  return <ChampionshipDetailsScreen championshipDetails={championshipDetails} />
}

export default ChampionshipDetailsContainer
