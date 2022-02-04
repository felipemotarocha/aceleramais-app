import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

// Screens
import ChampionshipsScreen from '~screens/app/championships/championships.container'

// Utilities
import { AppTabBottomParamList } from './app-bottom-navigator.types'
import Colors from '~constants/colors.constants'

const Tab = createBottomTabNavigator<AppTabBottomParamList>()

const AppBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.backgroundSecondary,
        tabBarActiveBackgroundColor: Colors.backgroundSecondary,
        headerTintColor: Colors.backgroundSecondary,
        tabBarLabelStyle: {
          fontFamily: 'Poppins_600SemiBold'
        },
        tabBarStyle: {
          backgroundColor: Colors.backgroundSecondary,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 10
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 5
        }
      }}>
      <Tab.Screen
        name="Championships"
        component={ChampionshipsScreen}
        options={{
          title: 'Campeonatos',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" color={color} size={22} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default AppBottomTabNavigator
