import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import ChampionshipItem from '~components/championship-item/championship-item.component'
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionships } from '~store/championships/championships.actions'
import Championship from '~types/championship.types'

import ChampionshipListScreen from './championship-list.screen'

interface ChampionshipListContainerProps {}

const ChampionshipListContainer: FunctionComponent<
  ChampionshipListContainerProps
> = () => {
  const { currentUser } = useAppSelector((state) => state.user)
  const { championships, loading } = useAppSelector(
    (state) => state.championships
  )

  const dispatch = useAppDispatch()

  const fetchChampionships = useCallback(() => {
    dispatch(getChampionships(currentUser!.id))
  }, [dispatch])

  useEffect(() => {
    fetchChampionships()
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: Championship }) => (
      <View style={{ marginVertical: 10 }}>
        <ChampionshipItem {...item} />
      </View>
    ),
    []
  )

  return (
    <ChampionshipListScreen
      championships={championships}
      loading={loading}
      renderItem={renderItem}
      fetchChampionships={fetchChampionships}
    />
  )
}

export default ChampionshipListContainer
