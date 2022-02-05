import { isEmpty } from 'lodash'
import React, { FunctionComponent } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// Components
import Header from '~components/common/header/header.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import CustomInput from '~components/common/custom-input/custom-input.component'

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
  filteredTracks: ({ isSelected: boolean } & Track)[]
  handleSearchChange: (value: string) => void
  renderItem: (
    track: Track & {
      isSelected: boolean
    }
    // eslint-disable-next-line no-undef
  ) => JSX.Element
}

const ChampionshipTrackSelectionScreen: FunctionComponent<
  ChampionshipTrackSelectionScreenProps
> = ({ tracks, filteredTracks, handleSearchChange, renderItem }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Circuitos</Header>

      <View style={{ paddingHorizontal: 20, paddingTop: 20, marginBottom: 20 }}>
        <CustomInput
          placeholder="Buscar Circuito..."
          onChangeText={handleSearchChange}
        />
      </View>

      <FlatList
        renderItem={({ item }) => renderItem(item)}
        data={isEmpty(filteredTracks) ? tracks : filteredTracks}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20
        }}
      />

      <View style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 10 }}>
        <CustomButton variant="primary">Avançar</CustomButton>
      </View>
    </View>
  )
}

export default ChampionshipTrackSelectionScreen
