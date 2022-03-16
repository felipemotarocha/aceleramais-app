import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { View } from 'react-native'

// Screens
import PenaltyOrBonificationDriverSelectionScreen from './driver-selection.screen'

// Components
import ChampionshipDriverItem from '~components/championship-driver-item/championship-driver-item.component'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { updateSelectedDriver } from '~store/race-penalties-and-bonifications/race-penalties-and-bonifications.slice'

// Utilities
import { ChampionshipDriver } from '~types/championship.types'

interface PenaltyOrBonificationDriverSelectionContainerProps {}

const PenaltyOrBonificationDriverSelectionContainer: FunctionComponent<
  PenaltyOrBonificationDriverSelectionContainerProps
> = () => {
  const { championshipDrivers, selectedDriver } = useAppSelector(
    (state) => state.racePenaltiesAndBonifications
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(updateSelectedDriver(undefined))
    }
  }, [])

  const handleDriverPress = useCallback(
    (driver: ChampionshipDriver) => {
      dispatch(updateSelectedDriver(driver))
    },
    [dispatch]
  )

  const _championshipDrivers = useMemo(
    () =>
      championshipDrivers.map((driver) => {
        if (driver.isRegistered !== selectedDriver?.isRegistered)
          return { ...driver, isSelected: false }

        if (
          driver.isRegistered &&
          driver.user!.id === selectedDriver.user!.id
        ) {
          return { ...driver, isSelected: true }
        }

        if (!driver.isRegistered && driver.id === selectedDriver.id) {
          return { ...driver, isSelected: true }
        }

        return { ...driver, isSelected: false }
      }),
    [championshipDrivers, selectedDriver]
  )

  const renderItem = useCallback(
    ({ item }: { item: ChampionshipDriver & { isSelected?: boolean } }) => {
      return (
        <View style={{ marginBottom: 3 }}>
          <ChampionshipDriverItem
            driver={item}
            profileImageSize={45}
            handlePress={handleDriverPress}
          />
        </View>
      )
    },
    []
  )

  return (
    <PenaltyOrBonificationDriverSelectionScreen
      championshipDrivers={_championshipDrivers}
      selectedDriver={selectedDriver}
      renderItem={renderItem}
    />
  )
}

export default PenaltyOrBonificationDriverSelectionContainer
