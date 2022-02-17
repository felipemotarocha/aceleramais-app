import React, { FunctionComponent } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

// Components
import ChampionshipDetailsHeaderContainer from '~components/championship-details-header/championship-details-header.container'
import Header from '~components/common/header/header.component'

import Colors from '~constants/colors.constants'
import Championship from '~types/championship.types'

interface ChampionshipDetailsScreenProps {
  championshipDetails?: Championship
}

const ChampionshipDetailsScreen: FunctionComponent<
  ChampionshipDetailsScreenProps
> = ({ championshipDetails }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Detalhes do Campeonato</Header>
      {championshipDetails && (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <ChampionshipDetailsHeaderContainer
            name={championshipDetails.name}
            platform={championshipDetails.platform}
            description={championshipDetails.description}
            avatarImageUrl={championshipDetails?.avatarImageUrl}
          />
        </ScrollView>
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

export default ChampionshipDetailsScreen
