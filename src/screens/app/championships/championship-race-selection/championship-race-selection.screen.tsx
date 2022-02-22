import React, { FunctionComponent } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// Components
import Header from '~components/common/header/header.component'

// Utilities
import Colors from '~constants/colors.constants'
import Race from '~types/race.types'

interface ChampionshipRaceSelectionScreenProps {
  races: Race[]
  // eslint-disable-next-line no-undef
  renderItem: ({ item }: { item: Race }) => JSX.Element
}

const ChampionshipRaceSelectionScreen: FunctionComponent<
  ChampionshipRaceSelectionScreenProps
> = ({ races, renderItem }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Selecione Uma Corrida</Header>

      <FlatList
        data={races}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 5,
          paddingHorizontal: 20
        }}
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

export default ChampionshipRaceSelectionScreen
