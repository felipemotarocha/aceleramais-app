import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import DraggableFlatList, { RenderItem } from 'react-native-draggable-flatlist'
import { isEmpty } from 'lodash'

// Components
import Header from '~components/common/header/header.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import RaceItem from '~components/race-item/race-item.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import RaceDriversSelectionModalContainer from '~components/race-drivers-selection-modal/race-drivers-selection-modal.container'
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'

// Utilities
import Colors from '~constants/colors.constants'
import { RaceClassification, RaceClassificationItem } from '~types/race.types'

interface RaceClassificationScreenProps {
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

const RaceClassificationScreen: FunctionComponent<
  RaceClassificationScreenProps
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

          {isEditable && !isEmpty(raceClassification?.classification) && (
            <View style={{ paddingHorizontal: 20, paddingTop: 5 }}>
              <TextRegular style={{ fontSize: 12 }}>
                Toque e segure em um piloto e o arraste para alterar sua
                posição.
              </TextRegular>
            </View>
          )}

          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <DraggableFlatList
              onDragEnd={isEditable ? handleDragEnd : () => {}}
              renderItem={renderItem}
              ListEmptyComponent={
                isEditable ? (
                  <CustomButton
                    variant="outlined"
                    onPress={handleEditDriversPress}>
                    Adicionar Pilotos
                  </CustomButton>
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TextMedium style={{ textAlign: 'center' }}>
                      Os resultados dessa corrida ainda não foram registrados
                      pelo administrador.
                    </TextMedium>
                  </View>
                )
              }
              data={raceClassification?.classification}
              keyExtractor={(item) => item?.id || item?.user?.id || ''}
              style={{
                paddingVertical: 15
              }}
            />
          </View>

          <View
            style={{ paddingTop: 5, paddingHorizontal: 20, paddingBottom: 20 }}>
            {!isEmpty(raceClassification?.classification) && (
              <CustomButton
                variant="outlined"
                style={{ marginBottom: 15 }}
                onPress={handlePenaltiesAndBonificationsPress}>
                Penalizações e Bonificações
              </CustomButton>
            )}
            {isEditable && (
              <CustomButton variant="primary" onPress={handleSavePress}>
                Salvar
              </CustomButton>
            )}
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

export default RaceClassificationScreen
