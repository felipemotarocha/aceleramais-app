import React, { FunctionComponent } from 'react'

// Screens
import UserProfileScreen from './user-profile.screen'

interface UserProfileContainerProps {}

const UserProfileContainer: FunctionComponent<
  UserProfileContainerProps
> = () => {
  return <UserProfileScreen />
}

export default UserProfileContainer
