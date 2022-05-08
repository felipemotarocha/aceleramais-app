import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

// Components
import ChampionshipDriverItem from '~components/championship-driver-item/championship-driver-item.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Colors from '~constants/colors.constants'
import { ChampionshipPendentDriver } from '~store/championship-pendent-drivers/championship-pendent-drivers.slice'
import Team from '~types/team.types'
import User from '~types/user.types'

interface ChampionshipPendentDriverItemProps {
  pendentDriver: ChampionshipPendentDriver
  handleApprovePress: (driver: ChampionshipPendentDriver) => void
  handleReprovePress: (driver: ChampionshipPendentDriver) => void
  handleUndoPress: (driver: ChampionshipPendentDriver) => void
}

const ChampionshipPendentDriverItem: FunctionComponent<
  ChampionshipPendentDriverItemProps
> = ({
  pendentDriver,
  handleApprovePress,
  handleReprovePress,
  handleUndoPress
}) => {
  return (
    <View style={styles.container}>
      <View>
        <ChampionshipDriverItem
          profileImageSize={45}
          driver={{
            user: pendentDriver.user as User,
            isRegistered: true,
            isRemoved: false,
            team: pendentDriver?.team as Team
          }}
        />
      </View>

      <View style={styles.bottom}>
        {pendentDriver.status === 'none' && (
          <>
            <CustomButton
              variant="outlined"
              style={{ flex: 1, marginRight: 10 }}
              onPress={() => handleApprovePress(pendentDriver)}>
              Aprovar
            </CustomButton>
            <CustomButton
              variant="outlined"
              style={{ flex: 1 }}
              onPress={() => handleReprovePress(pendentDriver)}>
              Reprovar
            </CustomButton>
          </>
        )}

        {pendentDriver.status === 'approved' && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 50
            }}>
            <MaterialIcons
              name="done"
              size={30}
              color={Colors.primary}
              accessibilityLabel="approved"
            />

            <TextSemiBold style={{ fontSize: 10, marginLeft: 8 }}>
              Aprovado
            </TextSemiBold>
          </View>
        )}

        {pendentDriver.status === 'reproved' && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 50
            }}>
            <AntDesign name="close" size={30} color={Colors.textSecondary} />

            <TextSemiBold style={{ fontSize: 10, marginLeft: 8 }}>
              Reprovado
            </TextSemiBold>
          </View>
        )}

        {pendentDriver.status !== 'none' && (
          <>
            <CustomButton
              variant="outlined"
              style={{ flex: 1 }}
              onPress={() => handleUndoPress(pendentDriver)}>
              Desfazer
            </CustomButton>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.input.background,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  }
})

export default ChampionshipPendentDriverItem
