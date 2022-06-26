import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import React, { FunctionComponent, useCallback } from 'react'
import { StyleSheet, View, Image, Pressable } from 'react-native'

// Components
import TextMedium from '~components/common/text-medium/text-medium.component'
import TextRegular from '~components/common/text-regular/text-regular.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'
import CustomButton from '~components/common/custom-button/custom-button.component'

// Utilities
import { ChampionshipDriverStandings } from '~types/championship.types'
import { AWS_CLOUDFRONT_URL } from '~constants/config.constants'
import { useAppSelector } from '~store'
import { ChampionshipDetailsScreenNavigationProp } from '~navigators/app/championships/championships.navigator.types'

const ChampionshipLeadingDrivers: FunctionComponent = () => {
  const navigation = useNavigation<ChampionshipDetailsScreenNavigationProp>()

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  const driverStandings = championshipDetails!
    .driverStandings as ChampionshipDriverStandings
  const championship = championshipDetails!.id

  const firstDriver = driverStandings.standings?.[0]
  const secondDriver = driverStandings.standings?.[1]
  const thirdDriver = driverStandings.standings?.[2]

  const handleDriverPress = useCallback(
    (driver: typeof firstDriver) => {
      if (!driver.isRegistered) return

      navigation.navigate('User Profile', {
        showBack: true,
        userName: driver?.user?.userName!
      })
    },
    [navigation]
  )

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
                `https://${AWS_CLOUDFRONT_URL}/user-avatars/default.png`
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

  const handleSeeStandingsPress = useCallback(
    () =>
      navigation.navigate('Championship Driver Standings', { championship }),
    [navigation, championship]
  )

  return (
    <View style={styles.container}>
      <TextSemiBold style={{ fontSize: 14, marginTop: 20, marginBottom: 10 }}>
        Líderes
      </TextSemiBold>
      {isEmpty(championshipDetails!.drivers) ? (
        <TextRegular style={{ fontSize: 12 }}>
          Este campeonato não possui nenhum piloto.
        </TextRegular>
      ) : isEmpty(driverStandings.standings) ? (
        <TextRegular style={{ fontSize: 12 }}>
          Os líderes ficarão disponíveis após a primeira corrida ser concluida.
        </TextRegular>
      ) : (
        <>
          {firstDriver && (
            <Pressable
              style={styles.driverItem}
              onPress={() => handleDriverPress(firstDriver)}>
              {renderImage(firstDriver)}
              <View>{renderDriverInfo(firstDriver)}</View>
            </Pressable>
          )}

          {secondDriver && (
            <Pressable
              style={styles.driverItem}
              onPress={() => handleDriverPress(secondDriver)}>
              {renderImage(secondDriver)}
              <View>{renderDriverInfo(secondDriver)}</View>
            </Pressable>
          )}

          {thirdDriver && (
            <Pressable
              style={styles.driverItem}
              onPress={() => handleDriverPress(thirdDriver)}>
              {renderImage(thirdDriver)}
              <View>{renderDriverInfo(thirdDriver)}</View>
            </Pressable>
          )}

          <CustomButton variant="outlined" onPress={handleSeeStandingsPress}>
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
