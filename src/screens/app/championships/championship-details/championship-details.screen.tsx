import React, { FunctionComponent } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Header from '~components/common/header/header.component'

import Colors from '~constants/colors.constants'

interface ChampionshipDetailsScreenProps {}

const ChampionshipDetailsScreen: FunctionComponent<
  ChampionshipDetailsScreenProps
> = () => {
  return (
    <View style={styles.container}>
      <Header showBack>Detalhes do Campeonato</Header>
      <ScrollView></ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default ChampionshipDetailsScreen
