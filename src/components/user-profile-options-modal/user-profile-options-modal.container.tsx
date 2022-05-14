import React, { FunctionComponent } from 'react'

// Components
import UserProfileOptionsModal from './user-profile-options-modal.component'

interface UserProfileOptionsModalContainerProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const UserProfileOptionsModalContainer: FunctionComponent<
  UserProfileOptionsModalContainerProps
> = ({ isVisible, setIsVisible }) => {
  return (
    <UserProfileOptionsModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  )
}

export default UserProfileOptionsModalContainer
