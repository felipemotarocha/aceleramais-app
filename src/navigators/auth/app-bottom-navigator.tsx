import React from 'react'
import { Pressable } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getAuth, signOut } from 'firebase/auth'
import TextBold from '~components/common/text-bold/text-bold.component'
import app from '~config/firebase.config'
import { useDispatch } from 'react-redux'
import { signOutUser } from '~store/user/user.actions'

const Tab = createBottomTabNavigator()

const AppBottomTabNavigator = () => {
  const dispatch = useDispatch()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={() => (
          <Pressable
            onPress={() => {
              signOut(getAuth(app))
              dispatch(signOutUser())
            }}>
            <TextBold>sign out</TextBold>
          </Pressable>
        )}
      />
    </Tab.Navigator>
  )
}

export default AppBottomTabNavigator
