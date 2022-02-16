import React, { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionships } from '~store/championships/championships.actions'

import ChampionshipListScreen from './championship-list.screen'

interface ChampionshipListContainerProps {}

const ChampionshipListContainer: FunctionComponent<
  ChampionshipListContainerProps
> = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getChampionships(currentUser!.id))
  }, [currentUser, dispatch])

  return <ChampionshipListScreen />
}

export default ChampionshipListContainer
