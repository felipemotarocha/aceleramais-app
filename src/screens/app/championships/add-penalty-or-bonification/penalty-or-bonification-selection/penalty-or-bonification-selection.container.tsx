import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

// Screens
import PenaltyOrBonificationSelectionScreen from './penalty-or-bonification-selection.screen'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  updateChampionshipDrivers,
  updateSelectedBonification,
  updateSelectedPenalty
} from '~store/race-penalties-and-bonifications/race-penalties-and-bonifications.slice'
import {
  getBonifications,
  getPenalties
} from '~store/race-penalties-and-bonifications/race-penalties-and-bonifications.actions'

// Utilities
import { PenaltyOrBonificationSelectionScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import { Bonification, Penalty } from '~types/championship.types'
import Colors from '~constants/colors.constants'

const PenaltyOrBonificationSelectionContainer: FunctionComponent = () => {
  const {
    params: { type }
  } = useRoute<PenaltyOrBonificationSelectionScreenRouteProp>()

  const dispatch = useAppDispatch()

  const navigation = useNavigation()

  const {
    race,
    championshipDrivers,
    selectedDriver,
    bonifications,
    penalties,
    selectedBonification,
    selectedPenalty
  } = useAppSelector((state) => state.racePenaltiesAndBonifications)

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  useEffect(() => {
    if (type === 'bonification') {
      dispatch(getBonifications(championshipDetails!.id))
    } else {
      dispatch(getPenalties(championshipDetails!.id))
    }

    return () => {
      dispatch(updateSelectedBonification(undefined))
      dispatch(updateSelectedPenalty(undefined))
    }
  }, [type, championshipDetails, dispatch])

  const _bonifications = useMemo(() => {
    if (!selectedBonification)
      return bonifications?.map((item) => ({ ...item, isSelected: false }))

    return bonifications?.map((item) =>
      item.id === selectedBonification.id
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false }
    )
  }, [bonifications, selectedBonification])

  const _penalties = useMemo(() => {
    if (!selectedPenalty)
      return penalties?.map((item) => ({ ...item, isSelected: false }))

    return penalties?.map((item) =>
      item.id === selectedPenalty.id
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false }
    )
  }, [penalties, selectedPenalty])

  const handleSavePress = useCallback(() => {
    const newChampionshipDrivers = championshipDrivers.map((driver) => {
      const driverId = driver.isRegistered ? driver.user!.id : driver.id
      const selectedDriverId = selectedDriver?.isRegistered
        ? selectedDriver.user!.id
        : selectedDriver!.id!

      if (driverId !== selectedDriverId) return driver

      if (type === 'bonification') {
        const bonificationWasAlreadyAdded = driver.bonifications?.some(
          (item) =>
            item.bonification.id === selectedBonification?.id &&
            item.race === race!.id
        )

        if (bonificationWasAlreadyAdded) return driver

        return {
          ...driver,
          bonifications: [
            ...(driver.bonifications || []),
            {
              race: race!.id,
              bonification: {
                id: selectedBonification!.id,
                points: selectedBonification!.points,
                name: selectedBonification!.name
              }
            }
          ]
        }
      }

      if (type === 'penalty') {
        const penaltyWasAlreadyAdded = driver.penalties?.some(
          (item) =>
            item.penalty.id === selectedPenalty?.id && item.race === race!.id
        )

        if (penaltyWasAlreadyAdded) return driver

        return {
          ...driver,
          penalties: [
            ...(driver.penalties || []),
            {
              race: race!.id,
              penalty: {
                id: selectedPenalty!.id,
                points: selectedPenalty!.points,
                name: selectedPenalty!.name
              }
            }
          ]
        }
      }

      return driver
    })

    dispatch(updateChampionshipDrivers(newChampionshipDrivers))

    navigation.goBack()
    navigation.goBack()
  }, [
    race,
    championshipDrivers,
    selectedBonification,
    selectedPenalty,
    selectedDriver,
    dispatch
  ])

  const handleItemPress = useCallback(
    (item: Bonification | Penalty) => {
      if (type === 'bonification') {
        if (selectedBonification?.id === item.id) {
          return dispatch(updateSelectedBonification(undefined))
        }

        return dispatch(updateSelectedBonification(item))
      }

      if (selectedPenalty?.id === item.id) {
        return dispatch(updateSelectedPenalty(undefined))
      }

      return dispatch(updateSelectedPenalty(item))
    },
    [type, selectedBonification, selectedPenalty, dispatch]
  )

  const renderItem = useCallback(
    ({
      item
    }: {
      item:
        | (Penalty & { isSelected: boolean })
        | (Bonification & { isSelected: boolean })
    }) => (
      <Pressable
        onPress={() => handleItemPress(item)}
        style={[
          styles.itemContainer,
          item.isSelected && { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        ]}>
        <View>
          <TextMedium style={{ fontSize: 14 }}>{item.name}</TextMedium>
          <TextMedium style={{ fontSize: 14 }}>
            {type === 'bonification' ? '+' : '-'}
            {item.points}
            {item.points > 1 ? ' pontos' : ' ponto'}
          </TextMedium>
        </View>

        {item?.isSelected && (
          <View>
            <MaterialIcons
              name="done"
              size={24}
              color={Colors.primary}
              accessibilityLabel="selected"
            />
          </View>
        )}
      </Pressable>
    ),
    [selectedBonification, selectedPenalty]
  )

  return (
    <PenaltyOrBonificationSelectionScreen
      selectedDriver={selectedDriver!}
      selectedBonification={selectedBonification}
      selectedPenalty={selectedPenalty}
      data={(type === 'bonification' ? _bonifications : _penalties) as any}
      renderItem={renderItem}
      handleSavePress={handleSavePress}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  }
})

export default PenaltyOrBonificationSelectionContainer
