import React, { FunctionComponent } from 'react'
import { FlatList, View } from 'react-native'

// Components
import CustomModal from '~components/common/custom-modal/custom-modal.component'
import CustomButton from '~components/common/custom-button/custom-button.component'
import TextRegular from '~components/common/text-regular/text-regular.component'

// Utilities
import { RaceClassificationItem } from '~types/race.types'

interface RaceDriversSelectionModalProps {
  isVisible: boolean
  availableDrivers: RaceClassificationItem[]
  setAvailableDrivers: (
    value: React.SetStateAction<RaceClassificationItem[]>
  ) => void
  handleSelectAllPress: () => void
  handleSavePress: () => void
  // eslint-disable-next-line no-undef
  renderItem: ({ item }: { item: RaceClassificationItem }) => JSX.Element
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RaceDriversSelectionModal: FunctionComponent<
  RaceDriversSelectionModalProps
> = ({
  isVisible,
  availableDrivers,
  handleSelectAllPress,
  handleSavePress,

  setIsVisible,
  renderItem
}) => {
  return (
    <CustomModal
      title="Selecionar Pilotos"
      showHeader
      isVisible={isVisible}
      setIsVisible={setIsVisible}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <TextRegular style={{ fontSize: 12 }}>
            Toque em um piloto para selecioná-lo. Toque e segure para definir se
            ele pontua ou não nos campeonatos.
          </TextRegular>
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 15 }}
          renderItem={renderItem}
          data={availableDrivers}
          keyExtractor={(item) => item?.id || item?.user?.id || ''}
        />
      </View>

      <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
        <CustomButton variant="outlined" onPress={handleSelectAllPress}>
          Selecionar Todos
        </CustomButton>
        <CustomButton
          variant="primary"
          style={{ marginTop: 15, marginBottom: 15 }}
          onPress={handleSavePress}>
          Salvar
        </CustomButton>
      </View>
    </CustomModal>
  )
}

export default RaceDriversSelectionModal
