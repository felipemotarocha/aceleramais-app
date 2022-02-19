import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { format } from 'date-fns'
import CountryFlag from 'react-native-country-flag'

// Components
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Screens
import ChampionshipRacesScreen from './championship-races.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionshipRaces } from '~store/championship-races/championship-races.actions'

// Utilities
import { ChampionshipRacesScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import Race from '~types/race.types'
import Colors from '~constants/colors.constants'

interface ChampionshipRacesContainerProps {}

const ChampionshipRacesContainer: FunctionComponent<
  ChampionshipRacesContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipRacesScreenRouteProp>()

  const dispatch = useAppDispatch()

  const { championshipRaces } = useAppSelector(
    (state) => state.championshipRaces
  )

  useEffect(() => {
    dispatch(getChampionshipRaces(championship))
  }, [championship, dispatch])

  const renderItem = useCallback(
    ({ item }: { item: Race }) => (
      <View style={styles.raceItem}>
        <CountryFlag
          isoCode={item.track.countryCode}
          size={28}
          style={{ borderRadius: 5 }}
        />

        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
          <TextMedium
            style={[
              { fontSize: 12 },
              item.isCompleted && { color: Colors.textSecondary }
            ]}
            numberOfLines={2}>
            {item.track.name}
          </TextMedium>
          <TextRegular
            style={[
              { fontSize: 12 },
              item.isCompleted && { color: Colors.textSecondary }
            ]}
            numberOfLines={1}>
            <TextMedium
              style={[
                { fontSize: 12 },
                item.isCompleted && { color: Colors.textSecondary }
              ]}>
              Data:
            </TextMedium>{' '}
            {format(new Date(item.startDate), 'dd/MM/yyyy, HH:mm')}
            {item.isCompleted && ' (concluída)'}
          </TextRegular>
        </View>
      </View>
    ),
    []
  )

  return (
    <ChampionshipRacesScreen
      races={championshipRaces}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  raceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  }
})

export default ChampionshipRacesContainer
