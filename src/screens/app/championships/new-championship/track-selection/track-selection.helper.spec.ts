/* eslint-disable import/first */
jest.mock('uuid', () => {
  return { v4: () => '2' }
})

import { _Race } from '~store/championship-creation/championship-creation.slice'
import ChampionshipTrackSelectionHelper from './track-selection.helper'

describe('Championship Track Selection Helper', () => {
  const tracks = [
    {
      id: '1',
      countryCode: 'BR',
      name: 'Autódromo José Carlos Pace',
      countryName: 'Brasil',
      isSelected: false
    },
    {
      id: '2',
      countryCode: 'ES',
      name: 'Circuit de Barcelona-Catalunya',
      countryName: 'Espanha',
      isSelected: false
    }
  ]

  it('should filter tracks based on search', () => {
    expect(
      ChampionshipTrackSelectionHelper.filterTracksBasedOnSearch({
        searchValue: 'Brasil',
        tracks
      })
    ).toStrictEqual([
      {
        id: '1',
        countryCode: 'BR',
        name: 'Autódromo José Carlos Pace',
        countryName: 'Brasil',
        isSelected: false
      }
    ])
  })

  it('should generate new races', () => {
    const previousRaces: _Race[] = [
      {
        id: '1',
        isCompleted: false,
        track: tracks[0],
        startDate: new Date().toISOString()
      }
    ]

    const _tracks = [
      {
        id: '1',
        countryCode: 'BR',
        name: 'Autódromo José Carlos Pace',
        countryName: 'Brasil',
        isSelected: true
      },
      {
        id: '2',
        countryCode: 'ES',
        name: 'Circuit de Barcelona-Catalunya',
        countryName: 'Espanha',
        isSelected: true
      }
    ]

    expect(
      ChampionshipTrackSelectionHelper.generateNewRaces({
        previousRaces,
        tracks: _tracks
      })
    ).toStrictEqual([
      ...previousRaces,
      {
        id: '2',
        isCompleted: false,
        track: _tracks[1],
        startDate: undefined
      }
    ])

    expect(
      ChampionshipTrackSelectionHelper.generateNewRaces({
        previousRaces,
        tracks
      })
    ).toStrictEqual([])
  })
})
