import React, { FunctionComponent } from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'

// Components
import FlatListWithPullRefresh from '~components/common/flatlist-with-pull-refresh/flatlist-with-pull-refresh.component'
import Header from '~components/common/header/header.component'

// Utilities
import Colors from '~constants/colors.constants'
import { ChampionshipPendentDriver } from '~store/championship-pendent-drivers/championship-pendent-drivers.slice'

interface ChampionshipPendentDriversScreenProps {
  pendentDrivers: ChampionshipPendentDriver[]
  refreshing: boolean
  refetch: () => void
  renderItem: ListRenderItem<any> | null | undefined
}

const ChampionshipPendentDriversScreen: FunctionComponent<
  ChampionshipPendentDriversScreenProps
> = ({ pendentDrivers, refreshing, refetch, renderItem }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Pilotos Pendentes</Header>
      <FlatListWithPullRefresh
        data={pendentDrivers}
        refreshing={refreshing}
        refetch={refetch}
        renderItem={renderItem}
        style={{ marginHorizontal: 20, paddingBottom: 20 }}
        keyExtractor={(item) => item.user.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default ChampionshipPendentDriversScreen
