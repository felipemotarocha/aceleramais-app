import { useRoute } from '@react-navigation/native'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { StyleSheet, View, Image } from 'react-native'

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
import { clear } from '~store/race-classification/race-classification.slice'

// Utilities
import { RaceClassificationEditionScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import { RaceClassificationItem } from '~types/race.types'
import Colors from '~constants/colors.constants'

interface RaceClassificationEditionContainerProps {}

const RaceClassificationEditionContainer: FunctionComponent<
  RaceClassificationEditionContainerProps
> = () => {
  const {
    params: { race }
  } = useRoute<RaceClassificationEditionScreenRouteProp>()

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

  const handleSavePress = useCallback(() => {
    dispatch(submitRaceClassificationEdit(raceClassification!))
  }, [dispatch, raceClassification])

  const renderItem = useCallback(
    ({ item }: { item: RaceClassificationItem }) => (
      <View style={styles.itemContainer}>
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
      </View>
    ),
    []
  )

  return (
    <RaceClassificationEditionScreen
      raceClassification={raceClassification}
      driversSelectionModalIsVisible={driversSelectionModalIsVisible}
      setDriversSelectionModalIsVisible={setDriversSelectionModalIsVisible}
      handleEditDriversPress={handleEditDriversPress}
      renderItem={renderItem}
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
