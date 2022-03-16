import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import { ChampionshipDriverStandingsItem } from '~types/championship.types'

interface DriverNameProps {
  driver: Omit<ChampionshipDriverStandingsItem, 'points' | 'position'>
  fontSize: number
}

const DriverName: FunctionComponent<DriverNameProps> = ({
  driver,
  fontSize
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
      }}>
      {driver?.team && (
        <View
          style={[
            styles.teamColorLine,
            { borderColor: driver.team.color }
          ]}></View>
      )}
      {driver.isRegistered ? (
        <>
          <TextMedium numberOfLines={1} style={{ fontSize }}>
            {driver.user?.firstName}{' '}
            <TextSemiBold style={{ fontSize }}>
              {driver.user?.lastName?.toUpperCase()}
            </TextSemiBold>
          </TextMedium>
        </>
      ) : (
        <TextMedium numberOfLines={1} style={{ fontSize }}>
          {driver.firstName}{' '}
          <TextSemiBold style={{ fontSize }}>
            {driver.lastName?.toUpperCase()}
          </TextSemiBold>
        </TextMedium>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  teamColorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 5,
    height: 15
  }
})

export default DriverName
