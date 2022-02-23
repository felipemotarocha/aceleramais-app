import { format } from 'date-fns'
import React, { FunctionComponent } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'

// Utilities
import Colors from '~constants/colors.constants'
import Race from '~types/race.types'

interface RaceItemProps {
  race: Race
  handlePress?: (race: string) => void
}

const RaceItem: FunctionComponent<RaceItemProps> = ({ race, handlePress }) => {
  return (
    <Pressable
      style={styles.raceItem}
      onPress={handlePress ? () => handlePress(race.id) : () => {}}>
      <CountryFlag
        isoCode={race.track.countryCode}
        size={28}
        style={{ borderRadius: 5 }}
      />

      <View style={{ marginLeft: 10, justifyContent: 'center' }}>
        <TextMedium
          style={[
            { fontSize: 12 },
            race.isCompleted && { color: Colors.textSecondary }
          ]}
          numberOfLines={2}>
          {race.track.name}
        </TextMedium>
        <TextRegular
          style={[
            { fontSize: 12 },
            race.isCompleted && { color: Colors.textSecondary }
          ]}
          numberOfLines={1}>
          <TextMedium
            style={[
              { fontSize: 12 },
              race.isCompleted && { color: Colors.textSecondary }
            ]}>
            Data:
          </TextMedium>{' '}
          {format(new Date(race.startDate), 'dd/MM/yyyy, HH:mm')}
          {race.isCompleted && ' (concluída)'}
        </TextRegular>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  raceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  }
})

export default RaceItem
