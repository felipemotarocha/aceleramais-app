import * as React from 'react'
import { format } from 'date-fns'
import { StyleSheet, View } from 'react-native'
import CountryFlag from 'react-native-country-flag'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

interface ChampionshipNextRaceItemProps {
  trackCountryCode: string
  trackName: string
  startDate: string
}

const ChampionshipNextRaceItem: React.FunctionComponent<
  ChampionshipNextRaceItemProps
> = ({ trackCountryCode, trackName, startDate }) => {
  return (
    <>
      <TextSemiBold style={{ fontSize: 14, marginBottom: 10, marginTop: 20 }}>
        Próxima Corrida
      </TextSemiBold>
      <View style={styles.container}>
        <CountryFlag
          isoCode={trackCountryCode}
          size={28}
          style={{ borderRadius: 5 }}
        />

        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
          <TextMedium style={{ fontSize: 12 }} numberOfLines={2}>
            {trackName}
          </TextMedium>
          <TextRegular style={{ fontSize: 12 }} numberOfLines={1}>
            <TextMedium style={{ fontSize: 12 }}>Data: </TextMedium>{' '}
            {format(new Date(startDate), 'dd/MM/yyyy, HH:mm')}
          </TextRegular>
        </View>
      </View>

      <CustomButton variant="outlined" style={{ marginTop: 15 }}>
        Ver Todas as Corridas
      </CustomButton>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ChampionshipNextRaceItem
