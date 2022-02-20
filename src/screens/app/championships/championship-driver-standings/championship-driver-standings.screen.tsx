import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import Header from '~components/common/header/header.component'
import FlatListWithPullRefresh from '~components/common/flatlist-with-pull-refresh/flatlist-with-pull-refresh.component'

import Championship, {
  ChampionshipDriverStandings,
  ChampionshipDriverStandingsItem
} from '~types/championship.types'
import Colors from '~constants/colors.constants'
import ChampionshipItem from '~components/championship-item/championship-item.component'
import { isEmpty } from 'lodash'

interface ChampionshipDriverStandingsScreenProps {
  championship?: Championship
  championshipDriverStandings?: ChampionshipDriverStandings
  loading: boolean
  renderItem: ({
    item
  }: {
    item: ChampionshipDriverStandingsItem
    // eslint-disable-next-line no-undef
  }) => JSX.Element
  fetch: () => Promise<void>
}

const ChampionshipDriverStandingsScreen: FunctionComponent<
  ChampionshipDriverStandingsScreenProps
> = ({
  championship,
  championshipDriverStandings,
  loading,
  fetch,
  renderItem
}) => {
  return (
    <View style={styles.container}>
      <Header showBack>Classificação de Pilotos</Header>

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
        data={championshipDriverStandings?.standings}
        refetch={fetch}
        refetchInterval={1}
        refreshing={
          isEmpty(championshipDriverStandings?.standings) ? false : loading
        }
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 5
        }}
        keyExtractor={(item) => item.id || item.user.id}
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

export default ChampionshipDriverStandingsScreen
