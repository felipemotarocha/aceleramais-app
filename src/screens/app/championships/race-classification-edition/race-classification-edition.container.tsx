import { useNavigation, useRoute } from '@react-navigation/native'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import { ScaleDecorator } from 'react-native-draggable-flatlist'

// Screens
import RaceClassificationEditionScreen from './race-classification-edition.screen'

// Components
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverName from '~components/driver-name/driver-name.component'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  getRaceClassification,
  submitRaceClassificationEdit
} from '~store/race-classification/race-classification.actions'
import {
  clear,
  updateRaceClassification
} from '~store/race-classification/race-classification.slice'
import { getChampionshipRaces } from '~store/championship-races/championship-races.actions'

// Utilities
import {
  RaceClassificationEditionNavigationProp,
  RaceClassificationEditionScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'
import { RaceClassification, RaceClassificationItem } from '~types/race.types'
import Colors from '~constants/colors.constants'
import { showSuccess } from '~helpers/flash-message.helpers'

interface RaceClassificationEditionContainerProps {}

const RaceClassificationEditionContainer: FunctionComponent<
  RaceClassificationEditionContainerProps
> = () => {
  const {
    params: { race }
  } = useRoute<RaceClassificationEditionScreenRouteProp>()

  const navigation = useNavigation<RaceClassificationEditionNavigationProp>()

  const [driversSelectionModalIsVisible, setDriversSelectionModalIsVisible] =
    useState(false)

  const { raceClassification } = useAppSelector(
    (state) => state.raceClassificationReducer
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getRaceClassification(race))

    return () => {
      dispatch(clear())
    }
  }, [race, dispatch])

  const handleEditDriversPress = useCallback(
    () => setDriversSelectionModalIsVisible((prevState) => !prevState),
    []
  )

  const handleSavePress = useCallback(async () => {
    await dispatch(submitRaceClassificationEdit(raceClassification!))

    await dispatch(getChampionshipRaces(raceClassification!.race.championship!))

    navigation.goBack()

    showSuccess('Os resultados foram salvos com sucesso!')
  }, [dispatch, raceClassification])

  const renderItem = useCallback(
    ({
      item,
      drag,
      isActive
    }: {
      item: RaceClassificationItem
      drag: any
      isActive: any
    }) => (
      <ScaleDecorator>
        <Pressable
          style={styles.itemContainer}
          onLongPress={drag}
          disabled={isActive}>
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
                    'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/default.png'
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
        </Pressable>
      </ScaleDecorator>
    ),
    []
  )

  const handleDragEnd = useCallback(
    ({ data }: { data: RaceClassification['classification'] }) => {
      if (!raceClassification) return

      const newClassification = data.map((item, index) => ({
        ...item,
        position: index + 1
      }))

      dispatch(
        updateRaceClassification({
          ...raceClassification,
          classification: newClassification
        })
      )
    },
    [dispatch, raceClassification]
  )

  return (
    <RaceClassificationEditionScreen
      raceClassification={raceClassification}
      driversSelectionModalIsVisible={driversSelectionModalIsVisible}
      setDriversSelectionModalIsVisible={setDriversSelectionModalIsVisible}
      handleEditDriversPress={handleEditDriversPress}
      renderItem={renderItem}
      handleDragEnd={handleDragEnd}
      handleSavePress={handleSavePress}
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

export default RaceClassificationEditionContainer
