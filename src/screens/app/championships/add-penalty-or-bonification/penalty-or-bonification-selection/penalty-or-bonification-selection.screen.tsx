import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

// Components
import Header from '~components/common/header/header.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import ChampionshipDriverItem from '~components/championship-driver-item/championship-driver-item.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Colors from '~constants/colors.constants'
import { PenaltyOrBonificationSelectionScreenRouteProp } from '~navigators/app/championships/championships.navigator.types'
import {
  Bonification,
  ChampionshipDriver,
  Penalty
} from '~types/championship.types'

interface PenaltyOrBonificationSelectionScreenProps {
  data:
    | (Penalty & { isSelected: boolean }[])
    | (Bonification & { isSelected: boolean }[])
  selectedDriver: ChampionshipDriver
  selectedBonification: Bonification | undefined
  selectedPenalty: Penalty | undefined
  renderItem: ({
    item
  }: {
    item:
      | (Penalty & {
          isSelected: boolean
        })
      | (Bonification & {
          isSelected: boolean
        })
    // eslint-disable-next-line no-undef
  }) => JSX.Element
}

const PenaltyOrBonificationSelectionScreen: FunctionComponent<
  PenaltyOrBonificationSelectionScreenProps
> = ({
  data,
  selectedDriver,
  selectedBonification,
  selectedPenalty,
  renderItem
}) => {
  const {
    params: { type }
  } = useRoute<PenaltyOrBonificationSelectionScreenRouteProp>()

  return (
    <View style={styles.container}>
      <Header showBack>
        Adicionar {type === 'penalty' ? 'Penalização' : 'Bonificação'}
      </Header>

      <TextSemiBold
        style={{ fontSize: 16, marginTop: 20, paddingHorizontal: 20 }}>
        Piloto Selecionado
      </TextSemiBold>

      <View style={{ paddingHorizontal: 12, paddingTop: 7 }}>
        <ChampionshipDriverItem driver={selectedDriver} profileImageSize={45} />
      </View>

      <TextSemiBold
        style={{ fontSize: 16, marginTop: 7, paddingHorizontal: 20 }}>
        Selecione a {type === 'penalty' ? 'Penalização' : 'Bonificação'}
      </TextSemiBold>

      <FlatList
        data={data as any}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingTop: 5 }}
      />

      <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
        <CustomButton
          variant="primary"
          disabled={!selectedBonification && !selectedPenalty}>
          Salvar
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

export default PenaltyOrBonificationSelectionScreen
