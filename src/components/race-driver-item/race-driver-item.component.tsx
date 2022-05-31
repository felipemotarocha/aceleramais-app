import * as React from 'react'
import { Pressable, Image, View, StyleSheet } from 'react-native'

// Components
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverName from '~components/driver-name/driver-name.component'
import EditRaceDriverModal from '~components/edit-race-driver-modal/edit-race-driver-modal.component'

// Utilities
import { RaceClassificationItem } from '~types/race.types'
import { AWS_CLOUDFRONT_URL } from '~constants/config.constants'

interface RaceDriverItemProps {
  driver: RaceClassificationItem
  raceDrivers: RaceClassificationItem[]
  setRaceDrivers: React.Dispatch<React.SetStateAction<RaceClassificationItem[]>>
  handlePress: (driver: RaceClassificationItem) => void
}

const RaceDriverItem: React.FunctionComponent<RaceDriverItemProps> = ({
  driver,
  raceDrivers,
  setRaceDrivers,
  handlePress
}) => {
  const [editDriverModalIsVisible, setEditDriverModalIsVisible] =
    React.useState(false)

  return (
    <>
      <Pressable
        onPress={() => handlePress(driver)}
        onLongPress={() => setEditDriverModalIsVisible(true)}
        style={[
          styles.driverContainer,
          driver.position !== 0 && { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        ]}>
        <View style={styles.left}>
          {driver.position !== 0 && (
            <TextSemiBold style={{ fontSize: 14, width: 25 }} numberOfLines={1}>
              {driver.position}º
            </TextSemiBold>
          )}

          <View style={styles.imageContainer}>
            <Image
              style={{ flex: 1, borderRadius: 30 }}
              source={{
                uri:
                  driver?.user?.profileImageUrl ||
                  `https://${AWS_CLOUDFRONT_URL}/user-avatars/default.png`
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <View>
              <DriverName driver={driver} fontSize={12} />
              {driver.isRegistered && (
                <TextRegular style={{ fontSize: 10 }}>
                  @{driver.user?.userName}
                </TextRegular>
              )}
            </View>

            <View>
              {!driver.scores && (
                <TextRegular style={{ fontSize: 10 }}>NÃO PONTUA</TextRegular>
              )}
            </View>
          </View>
        </View>

        <View style={styles.right}></View>
      </Pressable>

      {editDriverModalIsVisible && (
        <EditRaceDriverModal
          isVisible={editDriverModalIsVisible}
          availableDrivers={raceDrivers}
          setIsVisible={setEditDriverModalIsVisible}
          setAvailableDrivers={setRaceDrivers}
          driver={driver}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  driverContainer: {
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

export default RaceDriverItem
