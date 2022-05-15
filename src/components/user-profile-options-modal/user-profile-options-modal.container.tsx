import { signOut } from 'firebase/auth'
import React, { FunctionComponent, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

// Components
import UserProfileOptionsModal from './user-profile-options-modal.component'

// Utilities
import { auth } from '~config/firebase.config'
import { showSuccess } from '~helpers/flash-message.helpers'
import { UserProfileScreenNavigationProp } from '~navigators/app/my-profile/my-profile.navigator.types'

// Redux
import { signOutUser } from '~store/user/user.actions'
import { useAppDispatch, useAppSelector } from '~store'

interface UserProfileOptionsModalContainerProps {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const UserProfileOptionsModalContainer: FunctionComponent<
  UserProfileOptionsModalContainerProps
> = ({ isVisible, setIsVisible }) => {
  const dispatch = useAppDispatch()

  const navigation = useNavigation<UserProfileScreenNavigationProp>()

  const { currentUser } = useAppSelector((state) => state.user)

  const handleEditProfilePress = useCallback(() => {
    if (!currentUser) return

    setIsVisible(false)

    navigation.navigate('Sign Up', {
      isEdit: true,
      defaultValues: {
        email: currentUser.email!,
        ...currentUser
      }
    })
  }, [currentUser, navigation])

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
      handleEditProfilePress={handleEditProfilePress}
    />
  )
}

export default UserProfileOptionsModalContainer
