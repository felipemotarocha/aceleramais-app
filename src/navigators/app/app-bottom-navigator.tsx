import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

// Navigators
import ChampionshipsNavigator from './championships/championships.navigator'

// Utilities
import { AppTabBottomParamList } from './app-bottom-navigator.types'
import Colors from '~constants/colors.constants'
import SearchNavigator from './search/search.navigator'

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
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.backgroundSecondary,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: -2
          },
          shadowOpacity: 0.12,
          shadowRadius: 2.22,
          elevation: -5,
          padding: 8
        }
      }}>
      <Tab.Screen
        name="Championships"
        component={ChampionshipsNavigator}
        options={{
          title: 'Campeonatos',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="trophy" color={color} size={22} />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          title: 'Pesquisar',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={22} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default AppBottomTabNavigator
