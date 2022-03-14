import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

// Components
import Header from '~components/common/header/header.component'

// Utilities
import Colors from '~constants/colors.constants'

interface PenaltiesAndBonificationsScreenProps {}

const RacePenaltiesAndBonificationsEditionScreen: FunctionComponent<
  PenaltiesAndBonificationsScreenProps
> = () => {
  return (
    <View style={styles.container}>
      <Header showBack>Adicionar Bonificação</Header>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default RacePenaltiesAndBonificationsEditionScreen
