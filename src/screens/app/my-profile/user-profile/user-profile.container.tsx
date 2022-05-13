import React, { FunctionComponent, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

// Utilities
import { UserProfileScreenRouteProp } from '~navigators/app/my-profile/my-profile.navigator.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { getUserProfile } from '~store/user-profile/user-profile.actions'

// Screens
import UserProfileScreen from './user-profile.screen'
import { clear } from '~store/user-profile/user-profile.slice'

interface UserProfileContainerProps {}

const UserProfileContainer: FunctionComponent<
  UserProfileContainerProps
> = () => {
  const { params } = useRoute<UserProfileScreenRouteProp>()

  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector((state) => state.user)
  const { userProfile, loading } = useAppSelector((state) => state.userProfile)

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
    <UserProfileScreen
      userProfile={userProfile}
      refreshing={loading}
      refetch={fetchUserProfile}
    />
  )
}

export default UserProfileContainer
