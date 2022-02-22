import { useNavigation, useRoute } from '@react-navigation/native'
import * as React from 'react'
import { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'

// Components
import CustomButton from '~components/common/custom-button/custom-button.component'
import Header from '~components/common/header/header.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Colors from '~constants/colors.constants'
import {
  ChampionshipEditionScreenNavigationProp,
  ChampionshipEditionScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'

type Button = 'raceResults'

interface ChampionshipEditionScreenProps {}

const ChampionshipEditionScreen: React.FunctionComponent<
  ChampionshipEditionScreenProps
> = () => {
  const {
    params: { championship }
  } = useRoute<ChampionshipEditionScreenRouteProp>()
  const navigation = useNavigation<ChampionshipEditionScreenNavigationProp>()

  const handlePress = useCallback(
    (button: Button) => {
      return {
        raceResults: () =>
          navigation.navigate('Championship Race Selection', { championship })
      }[button]
    },
    [championship, navigation]
  )

  return (
    <View style={styles.container}>
      <Header showBack>Editar Campeonato</Header>

      <View style={{ padding: 20 }}>
        <TextSemiBold style={{ fontSize: 16, marginBottom: 15 }}>
          Geral
        </TextSemiBold>

        <CustomButton variant="outlined" style={{ alignItems: 'flex-start' }}>
          Editar Detalhes e Configurações
        </CustomButton>

        <CustomButton
          variant="outlined"
          style={{ marginVertical: 15, alignItems: 'flex-start' }}>
          Gerenciar Administradores
        </CustomButton>

        <CustomButton
          variant="outlined"
          style={{ marginBottom: 15, alignItems: 'flex-start' }}>
          Gerenciar Pilotos Pendentes
        </CustomButton>

        <TextSemiBold style={{ fontSize: 16, marginBottom: 15 }}>
          Resultados
        </TextSemiBold>

        <CustomButton
          onPress={() => handlePress('raceResults')()}
          variant="outlined"
          style={{ marginBottom: 15, alignItems: 'flex-start' }}>
          Editar Resultados de Uma Corrida
        </CustomButton>

        <TextSemiBold style={{ fontSize: 16, marginBottom: 15 }}>
          Zona Perigosa
        </TextSemiBold>

        <CustomButton variant="outlined" style={{ alignItems: 'flex-start' }}>
          Excluir Campeonato
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
})

export default ChampionshipEditionScreen
