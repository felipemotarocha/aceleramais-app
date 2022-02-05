import axios from 'axios'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { isEmpty } from 'lodash'
import { View } from 'react-native'

// Screens
import ChampionshipTrackSelectionScreen from './track-selection.screen'

// Components
import ChampionshipTrackItem from '~components/championship-track-item/championship-track-item.component'

// Utilities
import { API_URL } from '~constants/config.constants'
import Track from '~types/track.types'

// Redux
import { useAppDispatch, useAppSelector } from '~store'
import { updateTracks } from '~store/championship-creation/championship-creation.slice'

interface ChampionshipTrackSelectionContainerProps {}

const ChampionshipTrackSelectionContainer: FunctionComponent<
  ChampionshipTrackSelectionContainerProps
> = () => {
  const [filteredTracks, setFilteredTracks] = useState<
    (Track & { isSelected: boolean })[]
  >([])

  const { tracks } = useAppSelector((state) => state.championshipCreation)

  const dispatch = useAppDispatch()

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

      const newFilteredTracks = tracks
        .filter(
          (track) =>
            track.name.toLowerCase().startsWith(value.toLowerCase()) ||
            track.countryName.toLowerCase().startsWith(value.toLowerCase())
        )
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )

      setFilteredTracks(newFilteredTracks)
    },
    [tracks]
  )

  const renderItem = useCallback(
    (track: Track & { isSelected: boolean }) => (
      <View style={{ marginVertical: 10 }}>
        <ChampionshipTrackItem track={track} handlePress={handleTrackPress} />
      </View>
    ),
    [handleTrackPress]
  )

  return (
    <ChampionshipTrackSelectionScreen
      tracks={tracks}
      filteredTracks={filteredTracks}
      renderItem={renderItem}
      handleSearchChange={handleSearchChange}
    />
  )
}

export default ChampionshipTrackSelectionContainer
