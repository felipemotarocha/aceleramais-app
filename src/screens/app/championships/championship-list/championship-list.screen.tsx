import React, { FunctionComponent } from 'react'
import { View } from 'react-native'

// Components
import ChampionshipsHeader from '~components/championships-header/championships-header.container'

// Utilities
import Colors from '~constants/colors.constants'

interface CHampionshipListScreenProps {}

const CHampionshipListScreen: FunctionComponent<
  CHampionshipListScreenProps
> = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ChampionshipsHeader />
    </View>
  )
}

export default CHampionshipListScreen
