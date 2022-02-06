import 'react-native-get-random-values'
import React, { FunctionComponent, useCallback } from 'react'
import { View } from 'react-native'

// Components
import ChampionshipRaceDateSelection from './date-selection.screen'
import ChampionshipRaceDateItem from '~components/championship-race-date-item/championship-race-date-item.component'

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

  const dispatch = useAppDispatch()

  const handleRemovePress = async ({ track }: { track: { id: string } }) => {
    const newRaces = races.filter((race) => race.track.id !== track.id)
    const newTracks = tracks.map((_track) =>
      _track.id === track.id ? { ..._track, isSelected: false } : _track
    )

    await dispatch(updateTracks(newTracks))
    await dispatch(updateRaces(newRaces))
  }

  const handleSelectDatePress = useCallback((data) => {
    console.log({ data })
  }, [])

  const renderItem = useCallback(
    ({ item }: { item }) => {
      return (
        <View style={{ marginVertical: 5 }}>
          <ChampionshipRaceDateItem
            race={item}
            handleRemovePress={handleRemovePress}
            handleSelectDatePress={handleSelectDatePress}
          />
        </View>
      )
    },
    [tracks, races, dispatch]
  )

  return <ChampionshipRaceDateSelection races={races} renderItem={renderItem} />
}

export default ChampionshipRaceDateSelectionContainer
