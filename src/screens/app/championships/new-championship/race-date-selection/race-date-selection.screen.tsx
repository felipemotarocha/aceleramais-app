import React, { FunctionComponent } from 'react'
import { useFormContext } from 'react-hook-form'
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Components
import Header from '~components/common/header/header.component'

// Utilities
import Colors from '~constants/colors.constants'
import Track from '~types/track.types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

interface ChampionshipRaceDateSelectionScreenProps {
  races: { startDate?: string; track: Track; isCompleted: boolean }[]
  handleSubmit: () => void
  renderItem:
    | ListRenderItem<{
        startDate?: string | undefined
        track: Track
        isCompleted: boolean
      }>
    | null
    | undefined
}

const ChampionshipRaceDateSelectionScreen: FunctionComponent<
  ChampionshipRaceDateSelectionScreenProps
> = ({ races, handleSubmit, renderItem }) => {
  const { handleSubmit: _handleSubmit } = useFormContext()

  return (
    <View style={styles.container}>
      <Header showBack>Selecionar Data das Corridas</Header>

      <FlatList
        data={races}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />

      <View style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 10 }}>
        <CustomButton variant="primary" onPress={_handleSubmit(handleSubmit)}>
          Avançar
        </CustomButton>
      </View>
    </View>
  )
}

export default ChampionshipRaceDateSelectionScreen
