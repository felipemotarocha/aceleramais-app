import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import axios from 'axios'
import { isEmpty } from 'lodash'
import { StyleSheet, View, Image, Pressable } from 'react-native'

// Components
import RaceDriversSelectionModal from './race-drivers-selection-modal.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverName from '~components/driver-name/driver-name.component'
import TextRegular from '~components/common/text-regular/text-regular.component'

// Utilities
import Championship from '~types/championship.types'
import { RaceClassificationItem } from '~types/race.types'
import RaceDriversSelectionModalHelper from './race-drivers-selection-modal.helper'
import { API_URL } from '~constants/config.constants'

interface RaceDriversSelectionModalContainerProps {
  championship: string
  raceClassification: RaceClassificationItem[]
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RaceDriversSelectionModalContainer: FunctionComponent<
  RaceDriversSelectionModalContainerProps
> = ({ championship, raceClassification, isVisible, setIsVisible }) => {
  const [availableDrivers, setAvailableDrivers] = useState<
    RaceClassificationItem[]
  >([])

  useEffect(() => {
    const generateInitialAvailableDrivers = async () => {
      const { data }: { data: Championship } = await axios.get(
        `${API_URL}/api/championship/${championship}`
      )

      const _availableDrivers =
        RaceDriversSelectionModalHelper.generateInitialAvailableDrivers(
          data.drivers,
          raceClassification
        )

      setAvailableDrivers(_availableDrivers)
    }

    if (isEmpty(availableDrivers)) {
      generateInitialAvailableDrivers()
    }
  }, [availableDrivers])

  const selectedDrivers = useMemo(() => {
    return availableDrivers.filter((driver) => driver.position !== 0)
  }, [availableDrivers])

  const handleDriverPress = useCallback(
    (driver: RaceClassificationItem) => {
      const driverIsBeingUnselected = driver.position !== 0

      const newAvailableDrivers = availableDrivers.map((_driver) => {
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

      setAvailableDrivers(newAvailableDrivers)
    },
    [availableDrivers, selectedDrivers]
  )

  const handleSelectAllPress = useCallback(() => {
    const newAvailableDrivers = availableDrivers.map((driver, index) => ({
      ...driver,
      position: index + 1
    }))

    setAvailableDrivers(newAvailableDrivers)
  }, [availableDrivers])

  const renderItem = useCallback(
    ({ item }: { item: RaceClassificationItem }) => {
      return (
        <Pressable
          onPress={() => handleDriverPress(item)}
          style={[
            styles.itemContainer,
            item.position !== 0 && { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
          ]}>
          <View style={styles.left}>
            {item.position !== 0 && (
              <TextSemiBold
                style={{ fontSize: 14, width: 25 }}
                numberOfLines={1}>
                {item.position}º
              </TextSemiBold>
            )}

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

          <View style={styles.right}></View>
        </Pressable>
      )
    },
    [availableDrivers, selectedDrivers]
  )

  return (
    <RaceDriversSelectionModal
      isVisible={isVisible}
      availableDrivers={availableDrivers}
      handleSelectAllPress={handleSelectAllPress}
      setIsVisible={setIsVisible}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 15,
    borderRadius: 10
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

export default RaceDriversSelectionModalContainer
