import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { isEmpty } from 'lodash'
import { useDispatch } from 'react-redux'

// Components
import RaceDriversSelectionModal from './race-drivers-selection-modal.component'
import RaceDriverItem from '~components/race-driver-item/race-driver-item.component'

// Utilities
import api from '~api/axios.api'
import Championship from '~types/championship.types'
import { RaceClassification, RaceClassificationItem } from '~types/race.types'
import RaceDriversSelectionModalHelper from './race-drivers-selection-modal.helper'
import { API_URL } from '~constants/config.constants'

// Redux
import { updateRaceClassification } from '~store/race-classification/race-classification.slice'

interface RaceDriversSelectionModalContainerProps {
  championship: string
  raceClassification: RaceClassification
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RaceDriversSelectionModalContainer: FunctionComponent<
  RaceDriversSelectionModalContainerProps
> = ({ championship, raceClassification, isVisible, setIsVisible }) => {
  const [availableDrivers, setAvailableDrivers] = useState<
    RaceClassificationItem[]
  >([])

  const dispatch = useDispatch()

  useEffect(() => {
    const generateInitialAvailableDrivers = async () => {
      const { data }: { data: Championship } = await api.get(
        `${API_URL}/api/championship/${championship}`
      )

      const _availableDrivers =
        RaceDriversSelectionModalHelper.generateInitialAvailableDrivers(
          data.drivers,
          raceClassification.classification
        )

      setAvailableDrivers(_availableDrivers)
    }

    if (isEmpty(availableDrivers)) {
      generateInitialAvailableDrivers()
    }
  }, [availableDrivers, isVisible, raceClassification])

  useEffect(() => {
    return () => {
      setAvailableDrivers([])
    }
  }, [isVisible])

  const selectedDrivers = useMemo(() => {
    return availableDrivers.filter((driver) => driver.position !== 0)
  }, [availableDrivers, isVisible])

  const handleDriverPress = useCallback(
    (driver: RaceClassificationItem) => {
      const driverIsBeingUnselected = driver.position !== 0

      const newAvailableDrivers = availableDrivers
        .map((_driver) => {
          if (driver?.isRegistered && _driver?.user?.id !== driver?.user?.id) {
            if (_driver.position > driver.position && driverIsBeingUnselected) {
              return { ..._driver, position: _driver.position - 1 }
            }

            return _driver
          }

          if (!driver?.isRegistered && _driver?.id !== driver?.id) {
            if (_driver.position > driver.position && driverIsBeingUnselected) {
              return { ..._driver, position: _driver.position - 1 }
            }

            return _driver
          }

          return {
            ..._driver,
            position: _driver.position === 0 ? selectedDrivers.length + 1 : 0
          }
        })
        .sort((a, b) => {
          if (a.position === 0) return 1
          if (b.position === 0) return -1

          return a.position - b.position
        })

      setAvailableDrivers(newAvailableDrivers)
    },
    [availableDrivers, selectedDrivers, isVisible]
  )

  const handleSelectAllPress = useCallback(() => {
    const newAvailableDrivers = availableDrivers.map((driver, index) => ({
      ...driver,
      position: index + 1
    }))

    setAvailableDrivers(newAvailableDrivers)
  }, [availableDrivers, isVisible])

  const handleSavePress = useCallback(() => {
    const newRaceClassification: RaceClassification = {
      ...raceClassification,
      classification: selectedDrivers.sort((a, b) => a.position - b.position)
    }

    dispatch(updateRaceClassification(newRaceClassification))

    setIsVisible(false)
  }, [dispatch, selectedDrivers, isVisible])

  const renderItem = useCallback(
    ({ item }: { item: RaceClassificationItem }) => {
      return (
        <RaceDriverItem
          driver={item}
          handlePress={handleDriverPress}
          raceDrivers={availableDrivers}
          setRaceDrivers={setAvailableDrivers}
        />
      )
    },
    [availableDrivers, selectedDrivers, isVisible, handleDriverPress]
  )

  return (
    <>
      <RaceDriversSelectionModal
        isVisible={isVisible}
        availableDrivers={availableDrivers}
        setAvailableDrivers={setAvailableDrivers}
        handleSelectAllPress={handleSelectAllPress}
        setIsVisible={setIsVisible}
        renderItem={renderItem}
        handleSavePress={handleSavePress}
      />
    </>
  )
}

export default RaceDriversSelectionModalContainer
