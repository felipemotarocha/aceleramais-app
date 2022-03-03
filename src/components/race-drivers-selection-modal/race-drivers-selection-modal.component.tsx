import React, { FunctionComponent } from 'react'
import { FlatList, View } from 'react-native'

// Components
import CustomModal from '~components/common/custom-modal/custom-modal.component'

// Utilities
import { RaceClassificationItem } from '~types/race.types'

interface RaceDriversSelectionModalProps {
  isVisible: boolean
  selectedDrivers: RaceClassificationItem[]
  // eslint-disable-next-line no-undef
  renderItem: ({ item }: { item: RaceClassificationItem }) => JSX.Element
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RaceDriversSelectionModal: FunctionComponent<
  RaceDriversSelectionModalProps
> = ({ isVisible, selectedDrivers, setIsVisible, renderItem }) => {
  return (
    <CustomModal
      title="Selecionar Pilotos"
      isVisible={isVisible}
      setIsVisible={setIsVisible}>
      <View>
        <FlatList
          renderItem={renderItem}
          data={selectedDrivers}
          keyExtractor={(item) => item?.id || item?.user?.id || ''}
        />
      </View>
    </CustomModal>
  )
}

export default RaceDriversSelectionModal
