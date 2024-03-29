import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { MaterialIcons } from '@expo/vector-icons'

// Components
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import Track from '~types/track.types'
import Colors from '~constants/colors.constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
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
    alignItems: 'center',
    flex: 1
  },
  right: {
    justifyContent: 'center'
  }
})

interface ChampionshipTrackItemProps {
  track: Track & { isSelected: boolean }
  handlePress: (track: Track & { isSelected: boolean }) => void
}

const ChampionshipTrackItem: FunctionComponent<ChampionshipTrackItemProps> = ({
  track,
  handlePress
}) => {
  return (
    <Pressable
      style={[styles.container, track.isSelected && styles.selected]}
      onPress={() => handlePress(track)}>
      <View style={styles.left}>
        <CountryFlag
          size={28}
          isoCode={track.countryCode}
          style={{ borderRadius: 5 }}
        />

        <TextSemiBold
          style={{ marginLeft: 10, fontSize: 12, flex: 1 }}
          numberOfLines={2}>
          {track.name}
        </TextSemiBold>
      </View>

      {track.isSelected && (
        <View style={styles.right} accessibilityLabel="Selected">
          <MaterialIcons name="done" size={24} color={Colors.primary} />
        </View>
      )}
    </Pressable>
  )
}

export default ChampionshipTrackItem
