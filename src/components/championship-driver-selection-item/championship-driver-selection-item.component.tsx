import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import DriverItem from '~components/driver-item/driver-item.component'

// Utilities
import Colors from '~constants/colors.constants'
import { _Driver } from '~store/championship-creation/championship-creation.slice'

interface ChampionshipDriverSelectionItemProps {
  driver: _Driver
  handleRemovePress: (driver: _Driver) => void
}

const ChampionshipDriverSelectionItem: FunctionComponent<
  ChampionshipDriverSelectionItemProps
> = ({ driver, handleRemovePress }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <DriverItem profileImageUrl={driver?.profileImageUrl}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between'
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              {driver?.team && (
                <View
                  style={[
                    styles.teamColorLine,
                    { borderColor: driver.team.color }
                  ]}></View>
              )}
              <TextMedium numberOfLines={1}>
                {driver.firstName}{' '}
                <TextSemiBold>{driver.lastName?.toUpperCase()}</TextSemiBold>
              </TextMedium>
            </View>
            {driver.userName && (
              <View style={{ marginTop: 2 }}>
                <TextRegular style={{ fontSize: 10 }} numberOfLines={1}>
                  @{driver?.userName}
                </TextRegular>
              </View>
            )}
          </View>

          <Pressable
            style={styles.remove}
            onPress={() => handleRemovePress(driver)}
            accessibilityLabel={`Remove ${driver.userName}`}>
            <AntDesign name="close" size={24} color={Colors.textSecondary} />
          </Pressable>
        </View>
      </DriverItem>
    </View>
  )
}

const styles = StyleSheet.create({
  teamColorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 5,
    height: 15
  },
  remove: {
    justifyContent: 'center'
  }
})

export default ChampionshipDriverSelectionItem
