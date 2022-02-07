import 'react-native-get-random-values'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

// Screens
import ChampionshipRaceDateSelection from './race-date-selection.screen'

// Components
import ChampionshipRaceDateItem from '~components/championship-race-date-item/championship-race-date-item.component'

// Utilities
import ChampionshipRaceDateSelectionHelper from './race-date-selection.helper'
import { ChampionshipRaceDatesScreenNavigationProp } from '~navigators/app/championships/new-championship/new-championship.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  updateRaces,
  updateTracks
} from '~store/championship-creation/championship-creation.slice'

interface ChampionshipRaceDateSelectionContainerProps {}

const ChampionshipRaceDateSelectionContainer: FunctionComponent<
  ChampionshipRaceDateSelectionContainerProps
> = () => {
  const { races, tracks } = useAppSelector(
    (state) => state.championshipCreation
  )

  const navigation = useNavigation<ChampionshipRaceDatesScreenNavigationProp>()

  const defaultValues = useMemo(() => {
    let _defaultValues: { [raceId: string]: string | undefined } = {}

    for (const race of races) {
      _defaultValues = {
        ..._defaultValues,
        [race.id]: race.startDate
      }
    }

    return _defaultValues
  }, [])

  const methods = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  const handleRemovePress = async ({ track }: { track: { id: string } }) => {
    const newRaces = races.filter((race) => race.track.id !== track.id)
    const newTracks = tracks.map((_track) =>
      _track.id === track.id ? { ..._track, isSelected: false } : _track
    )

    await dispatch(updateTracks(newTracks))
    await dispatch(updateRaces(newRaces))
  }

  const handleDateChange = useCallback(
    async (raceId: string, date: Date | null) => {
      const newRaces = ChampionshipRaceDateSelectionHelper.sortByStartDate(
        races.map((race) =>
          race.id === raceId
            ? { ...race, startDate: date?.toISOString() }
            : race
        )
      )

      await dispatch(updateRaces(newRaces))
    },
    [dispatch, races]
  )

  const handleSubmit = useCallback(
    () => navigation.navigate('Championship Scoring System'),
    [navigation]
  )

  const renderItem = useCallback(
    ({ item }: { item }) => {
      return (
        <View style={{ marginVertical: 5 }}>
          <Controller
            control={methods.control}
            name={item.id}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <ChampionshipRaceDateItem
                race={item}
                hasError={!!methods.formState.errors?.[item.id]}
                handleRemovePress={handleRemovePress}
                handleDateChange={(date) => {
                  onChange(date)
                  handleDateChange(item.id, date)
                }}
              />
            )}
          />
        </View>
      )
    },
    [tracks, races, dispatch, methods]
  )

  return (
    <FormProvider {...methods}>
      <ChampionshipRaceDateSelection
        races={races}
        handleSubmit={handleSubmit}
        renderItem={renderItem}
      />
    </FormProvider>
  )
}

export default ChampionshipRaceDateSelectionContainer
