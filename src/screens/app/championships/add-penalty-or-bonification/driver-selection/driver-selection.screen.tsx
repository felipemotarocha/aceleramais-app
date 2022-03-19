import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

// Components
import Header from '~components/common/header/header.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Colors from '~constants/colors.constants'
import { PenaltyOrBonificationDriverSelectionScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import { ChampionshipDriver } from '~types/championship.types'

interface PenaltyOrBonificationDriverSelectionScreenProps {
  championshipDrivers: ChampionshipDriver[] & { selected?: boolean }
  selectedDriver: ChampionshipDriver | undefined
  handleAdvancePress: () => void
  renderItem: ({
    item
  }: {
    item: ChampionshipDriver & {
      selected?: boolean
    }
    // eslint-disable-next-line no-undef
  }) => JSX.Element
}

const PenaltyOrBonificationDriverSelectionScreen: FunctionComponent<
  PenaltyOrBonificationDriverSelectionScreenProps
> = ({
  championshipDrivers,
  selectedDriver,
  handleAdvancePress,
  renderItem
}) => {
  const {
    params: { type }
  } = useRoute<PenaltyOrBonificationDriverSelectionScreenRouteProp>()

  return (
    <View style={styles.container}>
      <Header showBack>
        Adicionar {type === 'penalty' ? 'Penalização' : 'Bonificação'}
      </Header>

      <TextSemiBold style={{ fontSize: 16, marginTop: 20, paddingLeft: 20 }}>
        Selecione o Piloto
      </TextSemiBold>

      <FlatList
        data={championshipDrivers}
        renderItem={renderItem}
        keyExtractor={(item) => item?.user?.id || item?.id || ''}
        style={{ padding: 12 }}
      />

      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <CustomButton
          variant="primary"
          disabled={!selectedDriver}
          onPress={handleAdvancePress}>
          Avançar
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

export default PenaltyOrBonificationDriverSelectionScreen
