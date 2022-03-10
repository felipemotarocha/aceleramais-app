import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

// Components
import ChampionshipDetailsHeaderContainer from '~components/championship-details-header/championship-details-header.container'
import ChampionshipLeadingDrivers from '~components/championship-leading-drivers/championship-leading-drivers.component'
import ChampionshipLeadingTeams from '~components/championship-leading-teams/championship-leading-teams.component'
import ChampionshipNextRaces from '~components/championship-next-race-item/championship-next-race-item.component'
import Header from '~components/common/header/header.component'
import ScrollViewWithPullRefresh from '~components/common/scrollview-with-pull-refresh/scrollview-with-pull-refresh.component'

import Colors from '~constants/colors.constants'
import Championship from '~types/championship.types'

interface ChampionshipDetailsScreenProps {
  championshipDetails?: Championship
  refreshing: boolean
  refetch: () => void
}

const ChampionshipDetailsScreen: FunctionComponent<
  ChampionshipDetailsScreenProps
> = ({ championshipDetails, refreshing, refetch }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Detalhes do Campeonato</Header>
      {championshipDetails && (
        <ScrollViewWithPullRefresh
          refetch={refetch}
          refreshing={refreshing}
          contentContainerStyle={{ padding: 20 }}>
          <ChampionshipDetailsHeaderContainer
            championship={championshipDetails.id}
            name={championshipDetails.name}
            platform={championshipDetails.platform}
            description={championshipDetails.description}
            avatarImageUrl={championshipDetails?.avatarImageUrl}
            admins={championshipDetails.admins}
          />

          <ChampionshipNextRaces
            championship={championshipDetails.id}
            nextRaces={championshipDetails.nextRaces}
          />

          <ChampionshipLeadingDrivers
            championship={championshipDetails.id}
            driverStandings={championshipDetails.driverStandings}
          />

          <ChampionshipLeadingTeams
            championship={championshipDetails.id}
            teamStandings={championshipDetails.teamStandings}
          />
        </ScrollViewWithPullRefresh>
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
