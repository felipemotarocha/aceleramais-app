import React, { FunctionComponent } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  View
} from 'react-native'

// Components
import CustomButton from '~components/common/custom-button/custom-button.component'
import Header from '~components/common/header/header.component'
import RaceItem from '~components/race-item/race-item.component'

// Utilities
import Colors from '~constants/colors.constants'
import {
  ChampionshipDriver,
  Bonification,
  Penalty
} from '~types/championship.types'
import Race from '~types/race.types'

interface PenaltiesAndBonificationsScreenProps {
  race?: Race
  data: (
    | {
        title: string
        data: {
          driver: ChampionshipDriver
          bonification: Bonification
        }[]
      }
    | {
        title: string
        data: {
          driver: ChampionshipDriver
          penalty: Penalty
        }[]
      }
  )[]
  renderItem: SectionListRenderItem<
    {
      driver: ChampionshipDriver
      bonification?: Bonification
      penalty?: Penalty
    },
    {
      title: string
      data: {
        driver: ChampionshipDriver
        bonification?: Bonification
        penalty?: Penalty
      }[]
    }
  >
  renderSectionHeader: (info: {
    section: SectionListData<
      {
        driver: ChampionshipDriver
        bonification?: Bonification | undefined
        penalty?: Penalty | undefined
      },
      {
        title: string
        data: {
          driver: ChampionshipDriver
          bonification?: Bonification
          penalty?: Penalty
        }[]
      }
    >
  }) => React.ReactElement
  handleSavePress: () => void
}

const RacePenaltiesAndBonificationsScreen: FunctionComponent<
  PenaltiesAndBonificationsScreenProps
> = ({ data, race, renderItem, renderSectionHeader, handleSavePress }) => {
  return (
    <View style={styles.container}>
      <Header showBack>Penalizações e Bonificações</Header>

      <View style={{ padding: 20, paddingBottom: 15 }}>
        {race && <RaceItem race={race} />}
      </View>

      <View style={{ flex: 1 }}>
        <SectionList
          sections={data}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item) =>
            item.driver.isRegistered
              ? item.driver.user!.id
              : item.driver.id || ''
          }
          style={{ paddingHorizontal: 20 }}
        />
      </View>

      <View
        style={{ paddingBottom: 20, paddingHorizontal: 20, paddingTop: 15 }}>
        <CustomButton variant="primary" onPress={handleSavePress}>
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

export default RacePenaltiesAndBonificationsScreen
