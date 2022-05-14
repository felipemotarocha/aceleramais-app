import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useRoute } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons'

// Utilities
import { UserProfileScreenRouteProp } from '~navigators/app/my-profile/my-profile.navigator.types'
import Colors from '~constants/colors.constants'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getUserProfile } from '~store/user-profile/user-profile.actions'
import { clear } from '~store/user-profile/user-profile.slice'

// Screens
import UserProfileScreen from './user-profile.screen'

// Components
import UserProfileOptionsModalContainer from '~components/user-profile-options-modal/user-profile-options-modal.container'

interface UserProfileContainerProps {}

const UserProfileContainer: FunctionComponent<
  UserProfileContainerProps
> = () => {
  const [optionsModalIsVisible, setOptionsModalIsVisible] = useState(false)

  const { params } = useRoute<UserProfileScreenRouteProp>()

  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector((state) => state.user)
  const { userProfile, loading } = useAppSelector((state) => state.userProfile)

  const renderOptionsButton = useCallback(
    () =>
      userProfile?.id === currentUser?.id ? (
        <SimpleLineIcons
          color={Colors.text}
          size={25}
          name="options"
          accessibilityLabel="Opções"
          onPress={() => setOptionsModalIsVisible(true)}
        />
      ) : (
        <></>
      ),
    [userProfile, currentUser]
  )

  const fetchUserProfile = async () => {
    if (params?.userName) {
      return dispatch(getUserProfile(params?.userName))
    }

    if (!params?.userName && currentUser) {
      return dispatch(getUserProfile(currentUser.userName))
    }
  }

  useEffect(() => {
    fetchUserProfile()

    return () => {
      dispatch(clear())
    }
  }, [dispatch])

  return (
    <>
      <UserProfileScreen
        userProfile={userProfile}
        refreshing={loading}
        refetch={fetchUserProfile}
        renderOptionsButton={renderOptionsButton}
      />
      <UserProfileOptionsModalContainer
        isVisible={optionsModalIsVisible}
        setIsVisible={setOptionsModalIsVisible}
      />
    </>
  )
}

export default UserProfileContainer
