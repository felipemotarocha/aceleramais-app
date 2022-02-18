import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from 'react'
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
  const { championships, filterBy, loading } = useAppSelector(
    (state) => state.championships
  )

  const dispatch = useAppDispatch()

  const fetchChampionships = useCallback(() => {
    dispatch(getChampionships(currentUser!.id))
  }, [dispatch])

  useEffect(() => {
    fetchChampionships()
  }, [])

  const filteredChampionships = useMemo(() => {
    if (!filterBy) return championships

    if (filterBy === 'admin') {
      return championships.filter((championship) =>
        championship.admins.some((admin) => admin.user === currentUser!.id)
      )
    }

    if (filterBy === 'completed') {
      // TODO: filter by "isCompleted" field
      return []
    }

    return championships
  }, [championships, currentUser, filterBy])

  const renderItem = useCallback(
    ({ item }: { item: Championship }) => (
      <View style={{ marginVertical: 10 }}>
        <ChampionshipItem {...item} nextRace={item.nextRaces?.[0]} />
      </View>
    ),
    []
  )

  return (
    <ChampionshipListScreen
      championships={filteredChampionships}
      loading={loading}
      renderItem={renderItem}
      fetchChampionships={fetchChampionships}
    />
  )
}

export default ChampionshipListContainer
