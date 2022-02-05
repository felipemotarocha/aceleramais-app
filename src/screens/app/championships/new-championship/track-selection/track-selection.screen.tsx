import React, { FunctionComponent } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// Components
import Header from '~components/common/header/header.component'

// Utilities
import Colors from '~constants/colors.constants'
import Track from '~types/track.types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  content: {
    flex: 1,
    padding: 20
  }
})

interface ChampionshipTrackSelectionScreenProps {
  tracks: ({ isSelected: boolean } & Track)[]
  renderItem: (
    track: Track & {
      isSelected: boolean
    }
    // eslint-disable-next-line no-undef
  ) => JSX.Element
}

const ChampionshipTrackSelectionScreen: FunctionComponent<
  ChampionshipTrackSelectionScreenProps
> = ({ tracks, renderItem }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Circuitos</Header>
      <FlatList
        renderItem={({ item }) => renderItem(item)}
        data={tracks}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  )
}

export default ChampionshipTrackSelectionScreen
