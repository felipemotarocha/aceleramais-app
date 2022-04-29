import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DraggableFlatList, { RenderItem } from 'react-native-draggable-flatlist'

// Components
import Header from '~components/common/header/header.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import RaceItem from '~components/race-item/race-item.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import RaceDriversSelectionModalContainer from '~components/race-drivers-selection-modal/race-drivers-selection-modal.container'

// Utilities
import Colors from '~constants/colors.constants'
import { RaceClassification, RaceClassificationItem } from '~types/race.types'

interface RaceClassificationEditionScreenProps {
  driversSelectionModalIsVisible: boolean
  isEditable: boolean
  handleEditDriversPress: () => void
  handlePenaltiesAndBonificationsPress: () => void
  setDriversSelectionModalIsVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >
  raceClassification: RaceClassification | undefined
  handleDragEnd: (data: any) => void
  // eslint-disable-next-line no-undef
  renderItem: RenderItem<RaceClassificationItem>
  handleSavePress: () => void
}

const RaceClassificationEditionScreen: FunctionComponent<
  RaceClassificationEditionScreenProps
> = ({
  driversSelectionModalIsVisible,
  isEditable,
  raceClassification,
  handleEditDriversPress,
  handlePenaltiesAndBonificationsPress,
  setDriversSelectionModalIsVisible,
  renderItem,
  handleSavePress,
  handleDragEnd
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
            onPress={isEditable ? handleEditDriversPress : () => {}}>
            <TextSemiBold style={{ fontSize: 16, marginRight: 8 }}>
              Pilotos
            </TextSemiBold>

            {isEditable && (
              <Feather name="edit" size={22} color={Colors.textSecondary} />
            )}
          </Pressable>

          <View style={{ flex: 1 }}>
            <DraggableFlatList
              onDragEnd={isEditable ? handleDragEnd : () => {}}
              renderItem={renderItem}
              ListEmptyComponent={
                <CustomButton
                  variant="outlined"
                  onPress={handleEditDriversPress}>
                  Adicionar Pilotos
                </CustomButton>
              }
              data={raceClassification?.classification}
              keyExtractor={(item) => item?.id || item?.user?.id || ''}
              style={{ paddingHorizontal: 20, paddingVertical: 15 }}
            />
          </View>

          <View
            style={{ paddingTop: 5, paddingHorizontal: 20, paddingBottom: 20 }}>
            <CustomButton
              variant="outlined"
              style={{ marginBottom: 15 }}
              onPress={handlePenaltiesAndBonificationsPress}>
              Penalizações e Bonificações
            </CustomButton>
            {isEditable && (
              <CustomButton variant="primary" onPress={handleSavePress}>
                Salvar
              </CustomButton>
            )}
          </View>

          {driversSelectionModalIsVisible && (
            <RaceDriversSelectionModalContainer
              championship={raceClassification.race.championship}
              raceClassification={raceClassification}
              isVisible={driversSelectionModalIsVisible}
              setIsVisible={setDriversSelectionModalIsVisible}
            />
          )}
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
