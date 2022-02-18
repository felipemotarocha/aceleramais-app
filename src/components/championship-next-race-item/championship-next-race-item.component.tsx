import * as React from 'react'
import { format } from 'date-fns'
import { StyleSheet, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import Race from '~types/race.types'

interface ChampionshipNextRacesProps {
  nextRaces: Race[]
}

const ChampionshipNextRaces: React.FunctionComponent<
  ChampionshipNextRacesProps
> = ({ nextRaces }) => {
  const firstRace = nextRaces?.[0]
  const secondRace = nextRaces?.[1]
  const thirdRace = nextRaces?.[2]

  const renderItem = React.useCallback((race: Race) => {
    if (!race) return null

    return (
      <View style={styles.container}>
        <CountryFlag
          isoCode={race.track.countryCode}
          size={28}
          style={{ borderRadius: 5 }}
        />

        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
          <TextMedium style={{ fontSize: 12 }} numberOfLines={2}>
            {race.track.name}
          </TextMedium>
          <TextRegular style={{ fontSize: 12 }} numberOfLines={1}>
            <TextMedium style={{ fontSize: 12 }}>Data: </TextMedium>{' '}
            {format(new Date(race.startDate), 'dd/MM/yyyy, HH:mm')}
          </TextRegular>
        </View>
      </View>
    )
  }, [])
  return (
    <>
      <TextSemiBold style={{ fontSize: 14, marginBottom: 10, marginTop: 20 }}>
        Próximas Corridas
      </TextSemiBold>

      {renderItem(firstRace)}
      {renderItem(secondRace)}
      {renderItem(thirdRace)}

      <CustomButton variant="outlined">Ver Todas as Corridas</CustomButton>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  }
})

export default ChampionshipNextRaces
