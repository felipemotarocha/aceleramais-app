import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

// Components
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Screens
import ChampionshipTeamStandingsScreen from './championship-team-standings.screen'

// Redux
import { useAppSelector, useAppDispatch } from '~store'
import { clear } from '~store/championship-creation/championship-creation.slice'
import { getChampionshipTeamStandings } from '~store/championship-team-standings/championship-team-standings.actions'

// Utilities
import { ChampionshipTeamStandingsItem } from '~types/championship.types'
import { ChampionshipTeamStandingsScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import Colors from '~constants/colors.constants'

interface ChampionshipTeamStandingsContainerProps {}

const ChampionshipTeamStandingsContainer: FunctionComponent<
  ChampionshipTeamStandingsContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipTeamStandingsScreenRouteProp>()

  const { championshipTeamStandings, loading } = useAppSelector(
    (state) => state.championshipTeamStandings
  )

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  const dispatch = useAppDispatch()

  const fetch = useCallback(
    () => dispatch(getChampionshipTeamStandings(championship)),
    [championship, dispatch]
  )

  useEffect(() => {
    fetch()

    return () => {
      dispatch(clear())
    }
  }, [fetch])

  const renderItem = useCallback(
    ({ item }: { item: ChampionshipTeamStandingsItem }) => (
      <View style={styles.itemContainer}>
        <View style={styles.left}>
          <TextSemiBold style={{ fontSize: 14, width: 25 }} numberOfLines={1}>
            {item.position}º
          </TextSemiBold>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={[styles.circle, { borderColor: item.team.color }]}></View>
          </View>
          <View
            style={[styles.colorLine, { borderColor: item.team.color }]}></View>
          <TextMedium style={{ fontSize: 12 }}>{item.team.name}</TextMedium>
        </View>

        <View style={styles.right}>
          <TextSemiBold style={{ fontSize: 10 }}>
            {item.points} pontos
          </TextSemiBold>
        </View>
      </View>
    ),
    []
  )
  return (
    <ChampionshipTeamStandingsScreen
      championshipTeamStandings={championshipTeamStandings}
      championship={championshipDetails}
      loading={loading}
      renderItem={renderItem}
      fetch={fetch}
    />
  )
}

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  right: {},
  itemContainer: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.input.background,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 3,
    marginRight: 8
  },
  colorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 5,
    height: 15
  }
})

export default ChampionshipTeamStandingsContainer
