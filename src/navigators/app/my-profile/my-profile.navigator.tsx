import React, { FunctionComponent } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import UserProfileScreen from '~screens/app/my-profile/user-profile/user-profile.screen'

// Utilities
import { UserStackParamList } from './my-profile.navigator.types'

interface MyProfileNavigatorProps {}

const Stack = createNativeStackNavigator<UserStackParamList>()

const MyProfileNavigator: FunctionComponent<MyProfileNavigatorProps> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
    </Stack.Navigator>
  )
}

export default MyProfileNavigator
