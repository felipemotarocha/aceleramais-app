import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent, useCallback, useEffect } from 'react'

// Screens
import ChampionshipDetailsScreen from './championship-details.screen'

// Utilities
import { ChampionshipDetailsScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionshipDetails } from '~store/championship-details/championship-details-actions'
import { clear } from '~store/championship-details/championship-details.slice'

interface ChampionshipDetailsContainerProps {}

const ChampionshipDetailsContainer: FunctionComponent<
  ChampionshipDetailsContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipDetailsScreenRouteProp>()

  const dispatch = useAppDispatch()

  const { championshipDetails, loading } = useAppSelector(
    (state) => state.championshipDetails
  )

  const fetchChampionshipDetails = useCallback(() => {
    dispatch(getChampionshipDetails(championship))
  }, [dispatch])

  useEffect(() => {
    fetchChampionshipDetails()

    return () => {
      dispatch(clear())
    }
  }, [fetchChampionshipDetails])

  return (
    <ChampionshipDetailsScreen
      championshipDetails={championshipDetails}
      refreshing={loading}
      refetch={fetchChampionshipDetails}
    />
  )
}

export default ChampionshipDetailsContainer
