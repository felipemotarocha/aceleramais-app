import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

// Components
import Header from '~components/common/header/header.component'

// Utilities
import Race from '~types/race.types'
import Colors from '~constants/colors.constants'

interface ChampionshipRacesScreenProps {
  races: Race[]
  // eslint-disable-next-line no-undef
  renderItem: ({ item }: { item: Race }) => JSX.Element
}

const ChampionshipRacesScreen: FunctionComponent<
  ChampionshipRacesScreenProps
> = ({ races, renderItem }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Corridas do Campeonato</Header>

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

export default ChampionshipRacesScreen
