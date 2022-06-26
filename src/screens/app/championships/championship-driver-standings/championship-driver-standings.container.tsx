import { useNavigation, useRoute } from '@react-navigation/native'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { StyleSheet, View, Image, Pressable } from 'react-native'

// Screens
import ChampionshipDriverStandingsScreen from './championship-driver-standings.screen'

// Redux
import { useAppDispatch, useAppSelector } from '~store'

// Components
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverName from '~components/driver-name/driver-name.component'

// Utilities
import {
  ChampionshipDriverStandingsScreenNavigationProp,
  ChampionshipDriverStandingsScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'
import { getChampionshipDriverStandings } from '~store/championship-driver-standings/championship-driver-standings.actions'
import { ChampionshipDriverStandingsItem } from '~types/championship.types'
import Colors from '~constants/colors.constants'
import { clear } from '~store/championship-driver-standings/championship-driver-standings.slice'
import { AWS_CLOUDFRONT_URL } from '~constants/config.constants'

interface ChampionshipDriverStandingsContainerProps {}

const ChampionshipDriverStandingsContainer: FunctionComponent<
  ChampionshipDriverStandingsContainerProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipDriverStandingsScreenRouteProp>()

  const navigation =
    useNavigation<ChampionshipDriverStandingsScreenNavigationProp>()

  const { championshipDriverStandings, loading } = useAppSelector(
    (state) => state.championshipDriverStandings
  )

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  const dispatch = useAppDispatch()

  const fetch = useCallback(
    () => dispatch(getChampionshipDriverStandings(championship)),
    [championship, dispatch]
  )

  useEffect(() => {
    fetch()

    return () => {
      dispatch(clear())
    }
  }, [fetch])

  const handleDriverPress = useCallback(
    (driver: ChampionshipDriverStandingsItem) => {
      if (!driver.isRegistered) return

      navigation.navigate('User Profile', {
        showBack: true,
        userName: driver.user?.userName!
      })
    },
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item: ChampionshipDriverStandingsItem }) => (
      <Pressable
        style={styles.itemContainer}
        onPress={() => handleDriverPress(item)}>
        <View style={styles.left}>
          <TextSemiBold style={{ fontSize: 14, width: 25 }} numberOfLines={1}>
            {item.position}º
          </TextSemiBold>

          <View style={styles.imageContainer}>
            <Image
              style={{ flex: 1, borderRadius: 30 }}
              source={{
                uri:
                  item?.user?.profileImageUrl ||
                  `https://${AWS_CLOUDFRONT_URL}/user-avatars/default.png`
              }}
            />
          </View>

          <View>
            <DriverName driver={item} fontSize={12} />
            {item.isRegistered && (
              <TextRegular style={{ fontSize: 10 }}>
                @{item.user?.userName}
              </TextRegular>
            )}
          </View>
        </View>

        <View style={styles.right}>
          <TextSemiBold style={{ fontSize: 10 }}>
            {item.points} pontos
          </TextSemiBold>
        </View>
      </Pressable>
    ),
    []
  )

  return (
    <ChampionshipDriverStandingsScreen
      championship={championshipDetails}
      championshipDriverStandings={championshipDriverStandings}
      loading={loading}
      renderItem={renderItem}
      fetch={fetch}
    />
  )
}

const styles = StyleSheet.create({
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  right: {},
  imageContainer: {
    elevation: 3,
    width: 35,
    height: 35,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    marginHorizontal: 8
  }
})

export default ChampionshipDriverStandingsContainer
