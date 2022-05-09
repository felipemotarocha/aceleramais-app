import React, { FunctionComponent } from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'
import CustomButton from '~components/common/custom-button/custom-button.component'

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
  handleSubmit: () => Promise<void>
}

const ChampionshipPendentDriversScreen: FunctionComponent<
  ChampionshipPendentDriversScreenProps
> = ({ pendentDrivers, refreshing, refetch, renderItem, handleSubmit }) => {
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

      <CustomButton
        variant="primary"
        style={{ marginHorizontal: 20, marginBottom: 20 }}
        onPress={handleSubmit}>
        Salvar
      </CustomButton>
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
