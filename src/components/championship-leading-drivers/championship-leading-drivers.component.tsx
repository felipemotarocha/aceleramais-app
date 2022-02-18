import { isEmpty } from 'lodash'
import React, { FunctionComponent, useCallback } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import { ChampionshipDriverStandings } from '~types/championship.types'

interface ChampionshipLeadingDriversProps {
  driverStandings: ChampionshipDriverStandings
}

const ChampionshipLeadingDrivers: FunctionComponent<
  ChampionshipLeadingDriversProps
> = ({ driverStandings }) => {
  const firstDriver = driverStandings.standings[0]
  const secondDriver = driverStandings.standings?.[1]
  const thirdDriver = driverStandings.standings?.[2]

  const renderImage = useCallback((driver: typeof firstDriver) => {
    if (!driver) return null

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextSemiBold style={{ fontSize: 14, marginRight: 8, width: 15 }}>
          {driver?.position}º
        </TextSemiBold>
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1, borderRadius: 45 }}
            source={{
              uri:
                driver?.user?.profileImageUrl ||
                'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/default.png'
            }}
          />
        </View>
      </View>
    )
  }, [])

  const renderDriverInfo = useCallback((driver: typeof firstDriver) => {
    if (!driver) return null

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
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
              <TextMedium numberOfLines={1} style={{ fontSize: 12 }}>
                {driver.user?.firstName}{' '}
                <TextSemiBold style={{ fontSize: 12 }}>
                  {driver.user?.lastName?.toUpperCase()}
                </TextSemiBold>
              </TextMedium>
            </>
          ) : (
            <TextMedium numberOfLines={1} style={{ fontSize: 12 }}>
              {driver.firstName}{' '}
              <TextSemiBold style={{ fontSize: 12 }}>
                {driver.lastName?.toUpperCase()}
              </TextSemiBold>
            </TextMedium>
          )}
        </View>
        <TextRegular style={{ fontSize: 12 }}>
          {driver.points} pontos
        </TextRegular>
      </View>
    )
  }, [])

  return (
    <View style={styles.container}>
      <TextSemiBold style={{ fontSize: 14, marginTop: 20, marginBottom: 10 }}>
        Líderes
      </TextSemiBold>
      {isEmpty(driverStandings.standings) ? (
        <TextRegular style={{ fontSize: 12 }}>
          Os líderes ficarão disponíveis após a primeira corrida ser concluida.
        </TextRegular>
      ) : (
        <>
          {firstDriver && (
            <View style={styles.driverItem}>
              {renderImage(firstDriver)}
              <View>{renderDriverInfo(firstDriver)}</View>
            </View>
          )}

          {secondDriver && (
            <View style={styles.driverItem}>
              {renderImage(secondDriver)}
              <View>{renderDriverInfo(secondDriver)}</View>
            </View>
          )}

          {thirdDriver && (
            <View style={styles.driverItem}>
              {renderImage(thirdDriver)}
              <View>{renderDriverInfo(thirdDriver)}</View>
            </View>
          )}

          <CustomButton variant="outlined">
            Ver Classificação Completa
          </CustomButton>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
    // flexDirection: 'row',
    // alignItems: 'center'
  },
  driverItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  teamColorLine: {
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 5,
    height: 15
  },
  imageContainer: {
    elevation: 3,
    width: 55,
    height: 55,
    borderRadius: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    marginRight: 10
  }
})

export default ChampionshipLeadingDrivers
