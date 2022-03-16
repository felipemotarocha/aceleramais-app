import '@testing-library/jest-native/extend-expect'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import { FlatList as mockFlatlist } from 'react-native'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }) => children
  const KeyboardAwareFlatList = mockFlatlist

  return { KeyboardAwareScrollView, KeyboardAwareFlatList }
})

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        championship: '620d62cb4e71a03355490930',
        race: '620d62cb4e71a03355490929'
      }
    })
  }
})
