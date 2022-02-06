import axios from 'axios'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Screens
import ChampionshipTrackSelectionScreen from './track-selection.screen'

// Components
import ChampionshipTrackItem from '~components/championship-track-item/championship-track-item.component'

// Utilities
import { API_URL } from '~constants/config.constants'
import Track from '~types/track.types'
import { ChampionshipRaceDatesScreenNavigationProp } from '~navigators/app/championships/new-championship/new-championship.types'
import ChampionshipTrackSelectionHelper from './track-selection.helper'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import {
  updateRaces,
  updateTracks
} from '~store/championship-creation/championship-creation.slice'

const ChampionshipTrackSelectionContainer: FunctionComponent = () => {
  const [filteredTracks, setFilteredTracks] = useState<
    (Track & { isSelected: boolean })[]
  >([])

  const { tracks, races } = useAppSelector(
    (state) => state.championshipCreation
  )

  const dispatch = useAppDispatch()

  const navigation = useNavigation<ChampionshipRaceDatesScreenNavigationProp>()

  useEffect(() => {
    const fetchAllTracks = async () => {
      if (!isEmpty(tracks)) return

      const { data: _tracks }: { data: Track[] } = await axios.get(
        `${API_URL}/api/track`
      )

      await dispatch(
        updateTracks(_tracks.map((track) => ({ ...track, isSelected: false })))
      )
    }

    fetchAllTracks()
  }, [tracks])

  const noTrackIsSelected = useMemo(
    () => tracks.every((track) => !track.isSelected),
    [tracks]
  )

  const handleTrackPress = useCallback(
    async (_track: Track & { isSelected: boolean }) => {
      const newTracks = tracks.map((track) =>
        track.id === _track.id
          ? { ...track, isSelected: !track.isSelected }
          : track
      )

      await dispatch(updateTracks(newTracks))

      setFilteredTracks([])
    },
    [tracks]
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      if (!value) return setFilteredTracks([])

      const newFilteredTracks =
        ChampionshipTrackSelectionHelper.filterTracksBasedOnSearch({
          searchValue: value,
          tracks
        })

      setFilteredTracks(newFilteredTracks)
    },
    [tracks]
  )

  const handleSubmit = useCallback(async () => {
    const newRaces = ChampionshipTrackSelectionHelper.generateNewRaces({
      tracks,
      previousRaces: races
    })

    await dispatch(updateRaces(newRaces))

    return navigation.navigate('Championship Race Dates')
  }, [dispatch, tracks, races])

  const renderItem = useCallback(
    (track: Track & { isSelected: boolean }) => (
      <View style={{ marginVertical: 10 }}>
        <ChampionshipTrackItem track={track} handlePress={handleTrackPress} />
      </View>
    ),
    [handleTrackPress, tracks, races, dispatch]
  )

  return (
    <ChampionshipTrackSelectionScreen
      tracks={tracks}
      filteredTracks={filteredTracks}
      noTrackIsSelected={noTrackIsSelected}
      renderItem={renderItem}
      handleSearchChange={handleSearchChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default ChampionshipTrackSelectionContainer
