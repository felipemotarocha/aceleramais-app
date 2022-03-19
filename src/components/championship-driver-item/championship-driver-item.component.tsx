import React, { FunctionComponent } from 'react'
import { Pressable, StyleSheet, View, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

// Components
import TextRegular from '~components/common/text-regular/text-regular.component'
import DriverName from '~components/driver-name/driver-name.component'
import Colors from '~constants/colors.constants'

// Utilities
import { ChampionshipDriver } from '~types/championship.types'

interface ChampionshipDriverItemProps {
  driver: ChampionshipDriver & { isSelected?: boolean }
  profileImageSize?: number
  nameTextSize?: number
  userNameTextSize?: number
  isSelectable?: boolean
  handlePress?: (driver: ChampionshipDriver) => void
}

const ChampionshipDriverItem: FunctionComponent<
  ChampionshipDriverItemProps
> = ({
  driver,
  profileImageSize = 35,
  nameTextSize = 12,
  userNameTextSize = 10,
  isSelectable = false,
  handlePress
}) => {
  return (
    <Pressable
      onPress={handlePress ? () => handlePress(driver) : () => {}}
      style={[
        styles.itemContainer,
        isSelectable &&
          driver?.isSelected && { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
      ]}>
      <View style={styles.left}>
        <View
          style={[
            styles.imageContainer,
            {
              width: profileImageSize,
              height: profileImageSize,
              borderRadius: profileImageSize
            }
          ]}>
          <Image
            style={{ flex: 1, borderRadius: 30 }}
            source={{
              uri:
                driver?.user?.profileImageUrl ||
                'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/default.png'
            }}
          />
        </View>

        <View>
          <DriverName driver={driver} fontSize={nameTextSize} />
          {driver.isRegistered && (
            <TextRegular style={{ fontSize: userNameTextSize }}>
              @{driver.user?.userName}
            </TextRegular>
          )}
        </View>
      </View>

      <View style={styles.right}>
        {isSelectable && driver?.isSelected && (
          <MaterialIcons name="done" size={24} color={Colors.primary} />
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 8
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  right: {},
  imageContainer: {
    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    marginRight: 8
  }
})

export default ChampionshipDriverItem
