import React from 'react'
import { Pressable } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TextBold from '~components/common/text-bold/text-bold.component'
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
