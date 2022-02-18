import React, { FunctionComponent } from 'react'
import { ListRenderItem, View } from 'react-native'

// Components
import ChampionshipsHeader from '~components/championships-header/championships-header.container'
import FlatListWithPullRefresh from '~components/common/flatlist-with-pull-refresh/flatlist-with-pull-refresh.component'

// Utilities
import Colors from '~constants/colors.constants'
import Championship from '~types/championship.types'

interface CHampionshipListScreenProps {
  championships: Championship[]
  loading: boolean
  renderItem: ListRenderItem<any> | null | undefined
  fetchChampionships: () => void
}

const ChampionshipListScreen: FunctionComponent<
  CHampionshipListScreenProps
> = ({ championships, loading, renderItem, fetchChampionships }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ChampionshipsHeader />

      <FlatListWithPullRefresh
        data={championships}
        refreshing={loading}
        renderItem={renderItem}
        refetch={fetchChampionships}
        refetchInterval={1}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
      />
    </View>
  )
}

export default ChampionshipListScreen
