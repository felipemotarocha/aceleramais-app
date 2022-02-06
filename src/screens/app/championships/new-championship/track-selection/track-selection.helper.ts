import { isEmpty } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import {
  _Race,
  _Track
} from '~store/championship-creation/championship-creation.slice'

const ChampionshipTrackSelectionHelper = {
  filterTracksBasedOnSearch: ({
    searchValue,
    tracks
  }: {
    searchValue: string
    tracks: _Track[]
  }) => {
    return tracks
      .filter(
        (track) =>
          track.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          track.countryName.toLowerCase().startsWith(searchValue.toLowerCase())
      )
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  },
  generateNewRaces: ({
    tracks,
    previousRaces
  }: {
    tracks: _Track[]
    previousRaces: _Race[]
  }) => {
    if (isEmpty(previousRaces)) {
      const newRaces = tracks
        .filter((track) => track.isSelected)
        .map((track) => ({
          id: uuidv4(),
          startDate: undefined,
          isCompleted: false,
          track
        }))

      return newRaces
    }

    const newRaces: _Race[] = tracks.reduce((acc = [], current) => {
      if (!current.isSelected) return acc

      const race = previousRaces.find((race) => race.track.id === current.id)

      if (!race) {
        acc.push({
          id: uuidv4(),
          startDate: undefined,
          track: current,
          isCompleted: false
        })

        return acc
      }

      acc.push(race)

      return acc
    }, [] as _Race[])

    return newRaces
  }
}

export default ChampionshipTrackSelectionHelper
