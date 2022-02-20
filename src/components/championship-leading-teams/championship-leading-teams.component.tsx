import { isEmpty } from 'lodash'
import React, { FunctionComponent, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import { ChampionshipTeamStandings } from '~types/championship.types'
import { ChampionshipDetailsScreenNavigationProp } from '~navigators/app/championships/championships.navigator.types'

interface ChampionshipLeadingTeamsProps {
  championship: string
  teamStandings: ChampionshipTeamStandings
}

const ChampionshipLeadingTeams: FunctionComponent<
  ChampionshipLeadingTeamsProps
> = ({ championship, teamStandings }) => {
  const navigation = useNavigation<ChampionshipDetailsScreenNavigationProp>()

  const firstTeam = teamStandings.standings[0]
  const secondTeam = teamStandings.standings?.[1]
  const thirdTeam = teamStandings.standings?.[2]

  const renderItem = useCallback((team: typeof firstTeam) => {
    if (!team) return null

    return (
      <View style={styles.teamItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextSemiBold style={{ fontSize: 14, marginRight: 8, width: 15 }}>
            {team.position}º
          </TextSemiBold>

          <View
            style={[styles.circle, { borderColor: team.team.color }]}></View>

          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={[
                  styles.colorLine,
                  { borderColor: team.team.color }
                ]}></View>
              <TextMedium style={{ fontSize: 12 }}>{team.team.name}</TextMedium>
            </View>

            <TextRegular style={{ fontSize: 12 }}>
              {team.points} pontos
            </TextRegular>
          </View>
        </View>
      </View>
    )
  }, [])

  const handleSeeStandingsPress = useCallback(
    () => navigation.navigate('Championship Team Standings', { championship }),
    [navigation, championship]
  )

  return (
    <>
      <TextSemiBold style={{ fontSize: 14, marginBottom: 10, marginTop: 20 }}>
        Times
      </TextSemiBold>

      {isEmpty(teamStandings.standings) ? (
        <TextRegular style={{ fontSize: 12, marginBottom: 15 }}>
          Os times ficarão disponíveis após a primeira corrida ser concluida.
        </TextRegular>
      ) : (
        <>
          {renderItem(firstTeam)}
          {renderItem(secondTeam)}
          {renderItem(thirdTeam)}

          <CustomButton variant="outlined" onPress={handleSeeStandingsPress}>
            Ver Classificação Completa
          </CustomButton>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 55,
    borderWidth: 3,
    marginRight: 10
  },
  colorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 5,
    height: 15
  },
  teamItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  }
})

export default ChampionshipLeadingTeams
