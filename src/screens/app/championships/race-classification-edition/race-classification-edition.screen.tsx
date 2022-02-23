import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'

// Components
import Header from '~components/common/header/header.component'
import RaceItem from '~components/race-item/race-item.component'

// Utilities
import Colors from '~constants/colors.constants'
import { RaceClassification } from '~types/race.types'

interface RaceClassificationEditionScreenProps {
  raceClassification: RaceClassification | undefined
}

const RaceClassificationEditionScreen: FunctionComponent<
  RaceClassificationEditionScreenProps
> = ({ raceClassification }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Editar Resultados da Corrida</Header>
      {raceClassification && (
        <View style={{ padding: 20 }}>
          <RaceItem race={raceClassification.race} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default RaceClassificationEditionScreen
