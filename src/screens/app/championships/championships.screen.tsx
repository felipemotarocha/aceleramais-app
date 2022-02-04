import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import Colors from '~constants/colors.constants'

interface ChampionshipsScreenProps {}

const ChampionshipsScreen: FunctionComponent<ChampionshipsScreenProps> = () => {
  return <View style={{ flex: 1, backgroundColor: Colors.background }}></View>
}

export default ChampionshipsScreen
