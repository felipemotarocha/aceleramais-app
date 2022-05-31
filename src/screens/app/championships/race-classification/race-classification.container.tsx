import { useNavigation, useRoute } from '@react-navigation/native'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import { ScaleDecorator } from 'react-native-draggable-flatlist'
import { useDispatch } from 'react-redux'

// Screens
import RaceClassificationScreen from './race-classification.screen'

// Components
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverName from '~components/driver-name/driver-name.component'
import Loading from '~components/common/loading/loading.component'

// Redux
import { useAppSelector } from '~store'
import {
  getChampionshipAdmins,
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
  RaceClassificationNavigationProp,
  RaceClassificationScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'
import { RaceClassification, RaceClassificationItem } from '~types/race.types'
import Colors from '~constants/colors.constants'
import { showError, showSuccess } from '~helpers/flash-message.helpers'
import { AWS_CLOUDFRONT_URL } from '~constants/config.constants'

interface RaceClassificationContainerProps {}

const RaceClassificationContainer: FunctionComponent<
  RaceClassificationContainerProps
> = () => {
  const {
    params: { race, championship }
  } = useRoute<RaceClassificationScreenRouteProp>()

  const navigation = useNavigation<RaceClassificationNavigationProp>()

  const [driversSelectionModalIsVisible, setDriversSelectionModalIsVisible] =
    useState(false)

  const { raceClassification, championshipAdmins, submitIsLoading } =
    useAppSelector((state) => state.raceClassification)

  const { currentUser } = useAppSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChampionshipAdmins(championship))
    dispatch(getRaceClassification(race))

    return () => {
      dispatch(clear())
    }
  }, [race, championship, dispatch])

  const isEditable = useMemo(
    () => championshipAdmins.includes(currentUser!.id),
    [championshipAdmins, currentUser]
  )

  const handleEditDriversPress = useCallback(
    () => setDriversSelectionModalIsVisible((prevState) => !prevState),
    []
  )

  const handlePenaltiesAndBonificationsPress = useCallback(() => {
    if (!raceClassification?.race.championship) return

    return navigation.navigate('Race Penalties and Bonifications Edition', {
      race,
      championship: raceClassification.race.championship
    })
  }, [navigation, raceClassification])

  const handleSavePress = useCallback(async () => {
    try {
      await dispatch(submitRaceClassificationEdit(raceClassification!))

      await dispatch(
        getChampionshipRaces(raceClassification!.race.championship!)
      )

      navigation.goBack()

      showSuccess('Os resultados foram salvos com sucesso!')
    } catch (_err) {
      showError('Algo deu errado.')
    }
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
          onLongPress={isEditable ? () => drag() : () => {}}
          disabled={isEditable ? isActive : true}>
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

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <View>
                <DriverName driver={item} fontSize={12} />
                {item.isRegistered && (
                  <TextRegular style={{ fontSize: 10 }}>
                    @{item.user?.userName}
                  </TextRegular>
                )}
              </View>

              <View>
                {!item.scores && (
                  <TextRegular style={{ fontSize: 10 }}>NÃO PONTUA</TextRegular>
                )}
              </View>
            </View>
          </View>
        </Pressable>
      </ScaleDecorator>
    ),
    [isEditable]
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
    <>
      {submitIsLoading && <Loading />}

      <RaceClassificationScreen
        raceClassification={raceClassification}
        driversSelectionModalIsVisible={driversSelectionModalIsVisible}
        isEditable={isEditable}
        setDriversSelectionModalIsVisible={setDriversSelectionModalIsVisible}
        handleEditDriversPress={handleEditDriversPress}
        handlePenaltiesAndBonificationsPress={
          handlePenaltiesAndBonificationsPress
        }
        renderItem={renderItem}
        handleDragEnd={handleDragEnd}
        handleSavePress={handleSavePress}
      />
    </>
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

export default RaceClassificationContainer
