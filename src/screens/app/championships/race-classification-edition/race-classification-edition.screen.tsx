import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'

// Components
import Header from '~components/common/header/header.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import RaceItem from '~components/race-item/race-item.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Colors from '~constants/colors.constants'
import { RaceClassification } from '~types/race.types'
import RaceDriversSelectionModalContainer from '~components/race-drivers-selection-modal/race-drivers-selection-modal.container'

interface RaceClassificationEditionScreenProps {
  driversSelectionModalIsVisible: boolean
  handleEditDriversPress: () => void
  setDriversSelectionModalIsVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >
  raceClassification: RaceClassification | undefined
}

const RaceClassificationEditionScreen: FunctionComponent<
  RaceClassificationEditionScreenProps
> = ({
  driversSelectionModalIsVisible,
  raceClassification,
  handleEditDriversPress,
  setDriversSelectionModalIsVisible
}) => {
  return (
    <View style={styles.container}>
      <Header showBack>Editar Resultados da Corrida</Header>
      {raceClassification && (
        <>
          <View style={{ padding: 20, paddingBottom: 15 }}>
            <RaceItem race={raceClassification.race} />
          </View>

          <Pressable
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            onPress={handleEditDriversPress}>
            <TextSemiBold style={{ fontSize: 16, marginRight: 8 }}>
              Pilotos
            </TextSemiBold>
            <Feather name="edit" size={22} color={Colors.textSecondary} />
          </Pressable>

          <View style={{ flex: 1 }}></View>

          <View
            style={{ paddingTop: 5, paddingHorizontal: 20, paddingBottom: 20 }}>
            <CustomButton variant="outlined" style={{ marginVertical: 15 }}>
              Penalizações e Bonificações
            </CustomButton>
            <CustomButton variant="primary">Salvar</CustomButton>
          </View>

          <RaceDriversSelectionModalContainer
            championship={raceClassification.race.championship}
            raceClassification={raceClassification}
            isVisible={driversSelectionModalIsVisible}
            setIsVisible={setDriversSelectionModalIsVisible}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default RaceClassificationEditionScreen
