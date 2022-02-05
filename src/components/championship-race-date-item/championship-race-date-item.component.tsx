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

interface ChampionshipRaceDateItemProps {
  race: { startDate?: string; track: Track; isCompleted: boolean }
}

const ChampionshipRaceDateItem: FunctionComponent<
  ChampionshipRaceDateItemProps
> = ({ race: { track, startDate, isCompleted } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <CountryFlag
          size={28}
          isoCode={track.countryCode}
          style={{ borderRadius: 5 }}
        />

        <View style={{ marginLeft: 10, flex: 1 }}>
          <TextMedium style={{ fontSize: 12, flex: 1 }} numberOfLines={2}>
            {track.name}
          </TextMedium>
          {startDate ? (
            <TextMedium style={{ fontSize: 12 }}>
              `Data: {format(new Date(startDate), 'DD/MM/yyyy, HH:mm')}
            </TextMedium>
          ) : (
            <TextMedium style={{ color: Colors.textSecondary, fontSize: 12 }}>
              Toque para selecionar a data
            </TextMedium>
          )}
        </View>
      </View>

      <Pressable style={styles.right}>
        <AntDesign name="close" size={24} color={Colors.textSecondary} />
      </Pressable>
    </View>
  )
}

export default ChampionshipRaceDateItem
