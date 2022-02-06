import React, { FunctionComponent } from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

// Components
import CustomButton from '~components/common/custom-button/custom-button.component'
import CustomInput from '~components/common/custom-input/custom-input.component'
import Header from '~components/common/header/header.component'

// Utilities
import Colors from '~constants/colors.constants'

// Redux
import { _ScoringSystem } from '~store/championship-creation/championship-creation.slice'

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

interface ChampionshipScoringSystemSelectionScreenProps {
  scoringSystem: _ScoringSystem[]
  renderItem: ListRenderItem<_ScoringSystem> | null | undefined
}

const ChampionshipScoringSystemSelectionScreen: FunctionComponent<
  ChampionshipScoringSystemSelectionScreenProps
> = ({ scoringSystem, renderItem }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Sistema de Pontuação</Header>
      <View style={styles.content}>
        <CustomInput
          placeholder="Pontos 1º Lugar"
          style={{ marginBottom: 20 }}
        />
        <CustomButton variant="outlined" style={{ marginBottom: 20 }}>
          Adicionar
        </CustomButton>

        <KeyboardAwareFlatList data={scoringSystem} renderItem={renderItem} />
      </View>
    </View>
  )
}

export default ChampionshipScoringSystemSelectionScreen
