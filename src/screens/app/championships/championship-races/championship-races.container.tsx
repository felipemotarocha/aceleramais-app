import { useNavigation, useRoute } from '@react-navigation/native'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
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
import {
  ChampionshipRacesScreenNavigationProp,
  ChampionshipRacesScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'
import Race from '~types/race.types'
import Colors from '~constants/colors.constants'
import { clear } from '~store/championship-races/championship-races.slice'

interface ChampionshipRacesContainerProps {}

const ChampionshipRacesContainer: FunctionComponent<
  ChampionshipRacesContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipRacesScreenRouteProp>()

  const dispatch = useAppDispatch()

  const navigation = useNavigation<ChampionshipRacesScreenNavigationProp>()

  const { championshipRaces } = useAppSelector(
    (state) => state.championshipRaces
  )

  // @ts-ignore
  useEffect(() => {
    dispatch(getChampionshipRaces(championship))

    return () => dispatch(clear())
  }, [championship, dispatch])

  const sortedChampionshipRaces = useMemo(() => {
    return [...championshipRaces].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
  }, [championshipRaces])

  const handleItemPress = useCallback(
    (race: string) =>
      navigation.navigate('Race Classification', { race, championship }),
    [navigation, championship]
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
    <ChampionshipRacesScreen
      races={sortedChampionshipRaces}
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
