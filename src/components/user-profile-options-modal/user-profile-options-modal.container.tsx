import { signOut } from 'firebase/auth'
import React, { FunctionComponent, useCallback } from 'react'

// Components
import UserProfileOptionsModal from './user-profile-options-modal.component'

// Utilities
import { auth } from '~config/firebase.config'
import { showSuccess } from '~helpers/flash-message.helpers'

// Redux
import { signOutUser } from '~store/user/user.actions'
import { useAppDispatch } from '~store'

interface UserProfileOptionsModalContainerProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const UserProfileOptionsModalContainer: FunctionComponent<
  UserProfileOptionsModalContainerProps
> = ({ isVisible, setIsVisible }) => {
  const dispatch = useAppDispatch()

  const handleSignOutPress = useCallback(() => {
    signOut(auth)
    dispatch(signOutUser())
    showSuccess('Você fez logout com sucesso.')
  }, [dispatch, auth])

  return (
    <UserProfileOptionsModal
      isVisible={isVisible}
      handleSignOutPress={handleSignOutPress}
      setIsVisible={setIsVisible}
    />
  )
}

export default UserProfileOptionsModalContainer
