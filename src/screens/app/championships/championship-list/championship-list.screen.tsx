import React, { FunctionComponent } from 'react'
import { ListRenderItem, View } from 'react-native'

// Components
import ChampionshipsHeader from '~components/championships-header/championships-header.container'
import FlatListWithPullRefresh from '~components/common/flatlist-with-pull-refresh/flatlist-with-pull-refresh.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import Colors from '~constants/colors.constants'
import Championship from '~types/championship.types'

interface CHampionshipListScreenProps {
  championships: Championship[]
  loading: boolean
  filterBy: 'admin' | 'completed' | undefined
  renderItem: ListRenderItem<any> | null | undefined
  fetchChampionships: () => void
}

const ChampionshipListScreen: FunctionComponent<
  CHampionshipListScreenProps
> = ({ championships, loading, filterBy, renderItem, fetchChampionships }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ChampionshipsHeader />

      <FlatListWithPullRefresh
        data={championships}
        refreshing={loading}
        renderItem={renderItem}
        refetch={fetchChampionships}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 20
            }}>
            <TextMedium style={{ textAlign: 'center' }}>
              {filterBy
                ? 'Nenhum campeonato com os filtros fornecidos foi encontrado.'
                : 'Aqui aparecerão os campeonatos que você criar e os que você estiver participando. Por enquanto, não há nada a exibir.'}
            </TextMedium>
          </View>
        }
      />
    </View>
  )
}

export default ChampionshipListScreen
