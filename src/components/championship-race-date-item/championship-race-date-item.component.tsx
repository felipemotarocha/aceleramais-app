import React, { FunctionComponent } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import Colors from '~constants/colors.constants'
import Track from '~types/track.types'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1
  },
  right: {
    justifyContent: 'center'
  }
})

type _Race = {
  id: string
  startDate?: string
  track: Track
  isCompleted: boolean
}

interface ChampionshipRaceDateItemProps {
  race: _Race
  handleRemovePress: (race: _Race) => void
  handleSelectDatePress: (race: _Race) => void
}

const ChampionshipRaceDateItem: FunctionComponent<
  ChampionshipRaceDateItemProps
> = ({ race, handleRemovePress, handleSelectDatePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <CountryFlag
          size={28}
          isoCode={race.track.countryCode}
          style={{ borderRadius: 5 }}
        />

        <View style={{ marginLeft: 10, flex: 1 }}>
          <TextMedium style={{ fontSize: 12, flex: 1 }} numberOfLines={2}>
            {race.track.name}
          </TextMedium>
          {race.startDate ? (
            <TextMedium style={{ fontSize: 12 }}>
              `Data: {format(new Date(race.startDate), 'DD/MM/yyyy, HH:mm')}
            </TextMedium>
          ) : (
            <Pressable onPress={() => handleSelectDatePress(race)}>
              <TextMedium style={{ color: Colors.textSecondary, fontSize: 12 }}>
                Toque para selecionar a data
              </TextMedium>
            </Pressable>
          )}
        </View>
      </View>

      <Pressable style={styles.right} onPress={() => handleRemovePress(race)}>
        <AntDesign name="close" size={24} color={Colors.textSecondary} />
      </Pressable>
    </View>
  )
}

export default ChampionshipRaceDateItem
