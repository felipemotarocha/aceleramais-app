import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Image, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// Components
import DriverName from '~components/driver-name/driver-name.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import {
  Bonification,
  ChampionshipDriverStandingsItem,
  Penalty
} from '~types/championship.types'
import Colors from '~constants/colors.constants'
import { AWS_CLOUDFRONT_URL } from '~constants/config.constants'

interface DriverBonificationAndPenaltyItemProps {
  type: 'bonification' | 'penalty'
  driver: Omit<ChampionshipDriverStandingsItem, 'points' | 'position'>
  bonification?: Bonification
  penalty?: Penalty
  editable: boolean
  handleRemovePress: (driver: string) => void
}

const DriverBonificationAndPenaltyItem: FunctionComponent<
  DriverBonificationAndPenaltyItemProps
> = ({ driver, bonification, penalty, type, editable, handleRemovePress }) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.imageContainer, styles.shadow]}>
            <Image
              style={{ flex: 1, borderRadius: 40 }}
              source={{
                uri:
                  driver?.user?.profileImageUrl ||
                  `https://${AWS_CLOUDFRONT_URL}/user-avatars/default.png`
              }}
            />
          </View>

          <View>
            <DriverName driver={driver} fontSize={12} />
            {driver.isRegistered && (
              <TextRegular style={{ fontSize: 10 }}>
                @{driver?.user?.userName}
              </TextRegular>
            )}
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          {type === 'bonification' && (
            <>
              <TextMedium style={{ fontSize: 14 }}>
                {bonification?.name}
              </TextMedium>
              <TextRegular style={{ fontSize: 12 }}>
                +{bonification!.points}{' '}
                {bonification!.points > 1 ? 'pontos' : 'ponto'}
              </TextRegular>
            </>
          )}

          {type === 'penalty' && (
            <>
              <TextMedium style={{ fontSize: 14 }}>{penalty?.name}</TextMedium>
              <TextRegular style={{ fontSize: 12 }}>
                -{penalty!.points} {penalty!.points > 1 ? 'pontos' : 'ponto'}
              </TextRegular>
            </>
          )}
        </View>
      </View>

      {editable && (
        <View>
          <Pressable
            style={{ justifyContent: 'center' }}
            onPress={() =>
              handleRemovePress(
                driver.isRegistered ? driver?.user?.id! : driver.id!
              )
            }>
            <AntDesign name="close" size={24} color={Colors.textSecondary} />
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.input.background,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,

    elevation: 3
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10
  }
})

export default DriverBonificationAndPenaltyItem
