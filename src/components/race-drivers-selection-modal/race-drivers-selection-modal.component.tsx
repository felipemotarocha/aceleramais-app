import React, { FunctionComponent } from 'react'
import { FlatList, View } from 'react-native'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Components
import CustomModal from '~components/common/custom-modal/custom-modal.component'
import EditRaceDriverModal from '~components/edit-race-driver-modal/edit-race-driver-modal.component'

// Utilities
import { RaceClassificationItem } from '~types/race.types'

interface RaceDriversSelectionModalProps {
  isVisible: boolean
  availableDrivers: RaceClassificationItem[]
  editDriverModalIsVisible: boolean
  driverBeingEdited: RaceClassificationItem | null
  setEditDriverModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  handleDismiss: () => void
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
  editDriverModalIsVisible,
  driverBeingEdited,
  setEditDriverModalIsVisible,
  handleSelectAllPress,
  handleSavePress,
  handleDismiss,
  setIsVisible,
  renderItem
}) => {
  return (
    <CustomModal
      title="Selecionar Pilotos"
      showHeader
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onDismiss={handleDismiss}>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}
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

      <EditRaceDriverModal
        isVisible={editDriverModalIsVisible}
        setIsVisible={setEditDriverModalIsVisible}
        driver={driverBeingEdited}
      />
    </CustomModal>
  )
}

export default RaceDriversSelectionModal
