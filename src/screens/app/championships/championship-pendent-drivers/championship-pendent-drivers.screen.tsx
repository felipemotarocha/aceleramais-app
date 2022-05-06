import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '~components/common/header/header.component'
import Colors from '~constants/colors.constants'

interface ChampionshipPendentDriversScreenProps {}

const ChampionshipPendentDriversScreen: FunctionComponent<
  ChampionshipPendentDriversScreenProps
> = () => {
  return (
    <View style={styles.container}>
      <Header showBack>Pilotos Pendentes</Header>
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
