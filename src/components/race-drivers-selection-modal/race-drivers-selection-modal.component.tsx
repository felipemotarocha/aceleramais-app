import React, { FunctionComponent } from 'react'

// Component
import CustomModal from '~components/common/custom-modal/custom-modal.component'

interface RaceDriversSelectionModalProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RaceDriversSelectionModal: FunctionComponent<
  RaceDriversSelectionModalProps
> = ({ isVisible, setIsVisible }) => {
  return (
    <CustomModal
      title="Selecionar Pilotos"
      isVisible={isVisible}
      setIsVisible={setIsVisible}></CustomModal>
  )
}

export default RaceDriversSelectionModal
