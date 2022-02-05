import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { MaterialIcons } from '@expo/vector-icons'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'

// Utilities
import Track from '~types/track.types'
import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    justifyContent: 'center'
  }
})

interface ChampionshipTrackItmeProps {
  track: Track & { isSelected: boolean }
}

const ChampionshipTrackItme: FunctionComponent<ChampionshipTrackItmeProps> = ({
  track
}) => {
  return (
    <Pressable style={[styles.container, track.isSelected && styles.selected]}>
      <View style={styles.left}>
        <CountryFlag size={36} isoCode={track.countryCode} />
        <TextMedium style={{ marginLeft: 10, fontSize: 12 }}>
          {track.name}
        </TextMedium>
      </View>

      {track.isSelected && (
        <View style={styles.right}>
          <MaterialIcons name="done" size={24} color={Colors.primary} />
        </View>
      )}
    </Pressable>
  )
}

export default ChampionshipTrackItme
