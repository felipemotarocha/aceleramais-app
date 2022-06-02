import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Pressable, SectionListData, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// Screens
import RacePenaltiesAndBonificationsScreen from './race-penalties-and-bonifications.screen'

// Components
import DriverBonificationAndPenaltyItem from '~components/driver-bonification-and-penalty-item/driver-bonification-and-penalty-item.component'
import TextSemiBold from '~components/common/text-semi-bold/text-semi-bold.component'

// Utilities
import {
  RacePenaltiesAndBonificationsScreenNavigationProp,
  RacePenaltiesAndBonificationsScreenRouteProp
} from '~navigators/app/championships/championships.navigator.types'
import Championship, {
  Bonification,
  ChampionshipDriver,
  Penalty
} from '~types/championship.types'
import Colors from '~constants/colors.constants'
import api from '~api/axios.api'
import { showError, showSuccess } from '~helpers/flash-message.helpers'
import User from '~types/user.types'
import Team from '~types/team.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  getChampionshipDrivers,
  getRace,
  submitRacePenaltiesAndBonificationsEdit
} from '~store/race-penalties-and-bonifications/race-penalties-and-bonifications.actions'
import { updateChampionshipDrivers } from '~store/race-penalties-and-bonifications/race-penalties-and-bonifications.slice'

interface PenaltiesAndBonificationsContainerProps {}

const RacePenaltiesAndBonificationsContainer: FunctionComponent<
  PenaltiesAndBonificationsContainerProps
> = () => {
  const [championshipWithFullPopulate, setChampionshipWithFullPopulate] =
    useState<Championship | null>(null)

  const dispatch = useAppDispatch()

  const route = useRoute<RacePenaltiesAndBonificationsScreenRouteProp>()
  const navigation =
    useNavigation<RacePenaltiesAndBonificationsScreenNavigationProp>()

  const { championshipDrivers, race } = useAppSelector(
    (state) => state.racePenaltiesAndBonifications
  )

  const { championshipDetails } = useAppSelector(
    (state) => state.championshipDetails
  )

  const { currentUser } = useAppSelector((state) => state.user)

  useEffect(() => {
    const fetchChampionshipWithFullPopulate = async () => {
      if (!championshipDetails) return

      const { data } = await api.get(
        `/api/championship/${championshipDetails.id}?full_populate=true`
      )

      setChampionshipWithFullPopulate(data)
    }

    fetchChampionshipWithFullPopulate()
  }, [championshipDetails])

  const fetchChampionshipDriversAndRace = async () => {
    await dispatch(getRace(route.params.race))
    await dispatch(getChampionshipDrivers(route.params.championship))
  }

  const canEdit = useMemo(
    () =>
      championshipDetails?.admins.some(
        (admin) => admin.user.id === currentUser!.id
      ) || false,
    [championshipDetails, currentUser]
  )

  const bonifications = useMemo(() => {
    const race = route.params.race

    const _bonifications: {
      driver: ChampionshipDriver
      bonification: Bonification
    }[] = []

    if (isEmpty(championshipDrivers)) return []

    for (const driver of championshipDrivers) {
      if (isEmpty(driver.bonifications)) continue

      for (const bonification of driver.bonifications!) {
        if (bonification.race !== race) continue

        const { penalties, bonifications, ...rest } = driver

        _bonifications.push({
          driver: rest,
          bonification: bonification.bonification
        } as any)
      }
    }

    return _bonifications
  }, [championshipDrivers, route])

  const penalties = useMemo(() => {
    const race = route.params.race

    const _penalties: {
      driver: ChampionshipDriver
      penalty: Penalty
    }[] = []

    for (const driver of championshipDrivers) {
      if (isEmpty(driver.penalties)) continue

      for (const penalty of driver.penalties!) {
        if (penalty.race !== race) continue

        const { penalties, bonifications, ...rest } = driver

        _penalties.push({
          driver: rest,
          penalty: penalty.penalty
        } as any)
      }
    }

    return _penalties
  }, [championshipDrivers, route])

  const handleRemovePress = useCallback(
    ({
      driver,
      penalty,
      bonification
    }: {
      driver: ChampionshipDriver
      penalty?: Penalty
      bonification?: Bonification
    }) => {
      const newChampionshipDrivers = championshipDrivers.map((_driver) => {
        const _driverId = _driver.isRegistered
          ? (_driver.user as User)!.id
          : _driver.id
        const driverId = driver.isRegistered
          ? (driver.user as User)!.id
          : driver.id

        if (_driverId !== driverId) return _driver

        if (bonification) {
          return {
            ..._driver,
            bonifications: _driver.bonifications?.filter(
              (item) =>
                (item.bonification as Bonification).id !== bonification.id
            )
          }
        }

        if (penalty) {
          return {
            ..._driver,
            penalties: _driver.penalties?.filter(
              (item) => (item.penalty as Penalty).id !== penalty.id
            )
          }
        }

        return driver
      })

      dispatch(updateChampionshipDrivers(newChampionshipDrivers))
    },
    [championshipDrivers, dispatch]
  )

  const renderItem = useCallback(
    ({
      item
    }: {
      item: {
        driver: ChampionshipDriver
        penalty?: Penalty
        bonification?: Bonification
      }
    }) => {
      return (
        <View style={{ marginBottom: 15 }}>
          <DriverBonificationAndPenaltyItem
            driver={item.driver as any}
            type={item.bonification ? 'bonification' : 'penalty'}
            bonification={item.bonification}
            penalty={item.penalty}
            editable={canEdit}
            handleRemovePress={() => handleRemovePress(item)}
          />
        </View>
      )
    },
    [handleRemovePress, canEdit]
  )

  const handleNewPress = (type: 'bonification' | 'penalty') => {
    navigation.navigate('Penalty or Bonification Driver Selection', { type })
  }

  const renderSectionHeader = useCallback(
    ({
      section
    }: {
      section: SectionListData<
        {
          driver: ChampionshipDriver
          bonification?: Bonification | undefined
          penalty?: Penalty | undefined
        },
        {
          title: string
          data: {
            driver: ChampionshipDriver
            bonification?: Bonification
            penalty?: Penalty
          }[]
        }
      >
    }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15
          }}>
          <TextSemiBold style={{ fontSize: 16, width: 115 }}>
            {section.title}
          </TextSemiBold>
          {canEdit && (
            <Pressable
              style={{ flex: 1 }}
              onPress={
                section.title === 'Bonificações'
                  ? () => handleNewPress('bonification')
                  : () => handleNewPress('penalty')
              }>
              <AntDesign name="plus" size={20} color={Colors.textSecondary} />
            </Pressable>
          )}
        </View>
      )
    },
    [canEdit]
  )

  const handleSavePress = useCallback(async () => {
    try {
      const {
        races,
        teams,
        bonifications,
        penalties,
        // @ts-ignore
        scoringSystem: { scoringSystem }
      } = championshipWithFullPopulate!

      const drivers = championshipDrivers.map((driver) => {
        const _driver = { ...driver }

        if (driver.isRegistered) {
          _driver.user = (driver.user as User)!.id
        }

        if (driver.team) {
          _driver.team = (driver.team as Team)!.id
        }

        if (driver.bonifications) {
          _driver.bonifications = driver.bonifications.map((item) => ({
            race: item.race,
            bonification: (item.bonification as Bonification).id
          })) as any
        }

        if (driver.penalties) {
          _driver.penalties = driver.penalties.map((item) => ({
            race: item.race,
            penalty: (item.penalty as Penalty).id
          })) as any
        }

        return _driver
      })

      const payload = {
        drivers,
        races,
        teams,
        bonifications,
        penalties,
        scoringSystem
      }

      dispatch(
        submitRacePenaltiesAndBonificationsEdit(
          championshipWithFullPopulate!.id,
          payload
        )
      )

      navigation.goBack()

      showSuccess('As modificações foram salvas com sucesso!')
    } catch (_err) {
      showError(
        'Algo deu errado. Por favor, tente novamente mais tarde ou entre em contato conosco.'
      )
    }
  }, [dispatch, navigation, championshipWithFullPopulate, championshipDrivers])

  const data = [
    {
      title: 'Bonificações',
      data: bonifications
    },
    {
      title: 'Penalizações',
      data: penalties
    }
  ]

  useEffect(() => {
    fetchChampionshipDriversAndRace()
  }, [])

  return (
    <>
      <RacePenaltiesAndBonificationsScreen
        race={race}
        canEdit={canEdit}
        data={
          data[0].data.length === 0 && data[1].data.length === 0 ? [] : data
        }
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        handleSavePress={handleSavePress}
      />
    </>
  )
}

export default RacePenaltiesAndBonificationsContainer
