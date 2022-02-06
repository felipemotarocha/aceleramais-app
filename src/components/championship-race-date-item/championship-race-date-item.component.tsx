import React, { FunctionComponent, useCallback, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { format } from 'date-fns'
import { AntDesign } from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

// Components
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

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
  },
  error: {
    color: Colors.error
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
  handleDateChange: (newDate: Date | null) => void
  hasError: boolean
}

const ChampionshipRaceDateItem: FunctionComponent<
  ChampionshipRaceDateItemProps
> = ({ race, hasError, handleRemovePress, handleDateChange }) => {
  const [dateModalIsVisible, setDateModalIsVisible] = useState(false)

  const handleSelectDatePress = useCallback(
    () => setDateModalIsVisible(true),
    [setDateModalIsVisible]
  )

  const _onConfirm = useCallback(
    (date: Date | null) => {
      handleDateChange(date)
      setDateModalIsVisible(false)
    },
    [handleDateChange, setDateModalIsVisible]
  )

  const _onCancel = useCallback(
    () => setDateModalIsVisible(false),
    [setDateModalIsVisible]
  )

  return (
    <View style={styles.container}>
      <Pressable style={styles.left} onPress={handleSelectDatePress}>
        <CountryFlag
          size={28}
          isoCode={race.track.countryCode}
          style={{ borderRadius: 5 }}
        />

        <View style={{ marginLeft: 10, flex: 1 }}>
          <TextSemiBold
            style={[{ fontSize: 12, flex: 1 }, hasError && styles.error]}
            numberOfLines={2}>
            {race.track.name}
          </TextSemiBold>
          {race.startDate ? (
            <>
              <TextMedium style={{ fontSize: 10, marginVertical: 1 }}>
                Data: {format(new Date(race.startDate), 'dd/MM/yyyy, HH:mm')}
              </TextMedium>

              <TextRegular
                style={{ fontSize: 10, color: Colors.textSecondary }}>
                Toque para alterar a data
              </TextRegular>
            </>
          ) : (
            <TextRegular
              style={[
                {
                  color: Colors.textSecondary,
                  fontSize: 10,
                  marginVertical: 1
                },
                hasError && styles.error
              ]}>
              Toque para selecionar a data
            </TextRegular>
          )}
        </View>
      </Pressable>

      <Pressable style={styles.right} onPress={() => handleRemovePress(race)}>
        <AntDesign
          name="close"
          size={24}
          color={hasError ? Colors.error : Colors.textSecondary}
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={dateModalIsVisible}
        mode="datetime"
        onConfirm={_onConfirm}
        onCancel={_onCancel}
        confirmButtonTestID="DateTimePicker.Confirm"
        cancelButtonTestID="DateTimePicker.Cancel"
      />
    </View>
  )
}

export default ChampionshipRaceDateItem
