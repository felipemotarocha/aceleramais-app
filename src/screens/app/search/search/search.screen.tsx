import React, { FunctionComponent, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'

// Components
import SearchHeader from '~components/search-header/search-header.component'
import ChampionshipItem from '~components/championship-item/championship-item.component'
import FlatListWithPullRefresh from '~components/common/flatlist-with-pull-refresh/flatlist-with-pull-refresh.component'

// Utilities
import Colors from '~constants/colors.constants'
import Championship from '~types/championship.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { submitSearch } from '~store/search/search.actions'
import TextMedium from '~components/common/text-medium/text-medium.component'

interface SearchScreenProps {}

const SearchScreen: FunctionComponent<SearchScreenProps> = () => {
  const { entity, result, loading, searchText } = useAppSelector(
    (state) => state.search
  )

  const dispatch = useAppDispatch()

  const fetchSearch = () => {
    if (!searchText) return

    dispatch(submitSearch(searchText, entity))
  }

  const renderItem = useCallback(
    ({ item }: { item: Championship }) => (
      <View style={{ marginVertical: 10 }}>
        <ChampionshipItem
          {...item}
          nextRace={item.nextRaces?.[0]}
          goToDetailsOnPress
        />
      </View>
    ),
    []
  )

  return (
    <View style={styles.container}>
      <SearchHeader />

      {entity === 'championship' && (
        <FlatListWithPullRefresh
          data={result as Championship[]}
          refetch={fetchSearch}
          refreshing={loading}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10
              }}>
              <TextMedium>Não há campeonatos para exibir.</TextMedium>
            </View>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default SearchScreen
