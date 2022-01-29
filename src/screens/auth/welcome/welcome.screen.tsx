import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'

interface WelcomeScreenProps {}

const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = () => {
  return (
    <Text>
      Campeonatos do Automobilismo Virtual na palma da sua mão. De graça.
    </Text>
  )
}

export default WelcomeScreen
