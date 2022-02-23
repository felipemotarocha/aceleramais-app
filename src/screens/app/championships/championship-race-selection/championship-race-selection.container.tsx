import { useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, StyleSheet, View } from 'react-native'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { format } from 'date-fns'
import CountryFlag from 'react-native-country-flag'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'

// Screens
import ChampionshipRaceSelectionScreen from './championship-race-selection.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getChampionshipRaces } from '~store/championship-races/championship-races.actions'
import { clear } from '~store/championship-races/championship-races.slice'

// Utilities
import {
  ChampionshipRaceSelectionNavigationProp,
  ChampionshipRaceSelectionScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'
import Race from '~types/race.types'
import Colors from '~constants/colors.constants'

interface ChampionshipRaceSelectionContainerProps {}

const ChampionshipRaceSelectionContainer: FunctionComponent<
  ChampionshipRaceSelectionContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipRaceSelectionScreenRouteProp>()

  const dispatch = useAppDispatch()

  const navigation = useNavigation<ChampionshipRaceSelectionNavigationProp>()

  const { championshipRaces } = useAppSelector(
    (state) => state.championshipRaces
  )

  useEffect(() => {
    dispatch(getChampionshipRaces(championship))

    return () => {
      dispatch(clear())
    }
  }, [championship, dispatch])

  const handleItemPress = useCallback(
    (race: string) =>
      navigation.navigate('Race Classification Edition', { race }),
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item: Race }) => (
      <Pressable
        style={styles.raceItem}
        onPress={() => handleItemPress(item.id)}>
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
      </Pressable>
    ),
    []
  )

  return (
    <ChampionshipRaceSelectionScreen
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

export default ChampionshipRaceSelectionContainer
