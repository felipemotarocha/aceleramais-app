import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

// Components
import Header from '~components/common/header/header.component'
import FlatListWithPullRefresh from '~components/common/flatlist-with-pull-refresh/flatlist-with-pull-refresh.component'
import ChampionshipItem from '~components/championship-item/championship-item.component'

// Utilities
import Championship, {
  ChampionshipTeamStandings,
  ChampionshipTeamStandingsItem
} from '~types/championship.types'
import Colors from '~constants/colors.constants'

interface ChampionshipTeamStandingsScreenProps {
  championship?: Championship
  championshipTeamStandings?: ChampionshipTeamStandings
  loading: boolean
  // eslint-disable-next-line no-undef
  renderItem: ({ item }: { item: ChampionshipTeamStandingsItem }) => JSX.Element
  fetch: () => Promise<void>
}

const ChampionshipTeamStandingsScreen: FunctionComponent<
  ChampionshipTeamStandingsScreenProps
> = ({
  championship,
  championshipTeamStandings,
  loading,
  renderItem,
  fetch
}) => {
  return (
    <View style={styles.container}>
      <Header showBack>Classificação de Times</Header>

      {championship && (
        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <ChampionshipItem
            {...championship}
            goToDetailsOnPress={false}
            nextRace={championship?.nextRaces?.[0]}
          />
        </View>
      )}

      <FlatListWithPullRefresh
        data={championshipTeamStandings?.standings}
        refetch={fetch}
        refetchInterval={1}
        refreshing={loading}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 5
        }}
        keyExtractor={(item) => item.team.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default ChampionshipTeamStandingsScreen
