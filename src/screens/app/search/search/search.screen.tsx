import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'

// Components
import SearchHeader from '~components/search-header/search-header.component'

// Utilities
import Colors from '~constants/colors.constants'

interface SearchScreenProps {}

const SearchScreen: FunctionComponent<SearchScreenProps> = () => {
  return (
    <View style={styles.container}>
      <SearchHeader />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default SearchScreen
