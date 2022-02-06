import React from 'react'
import mockAxios from 'jest-mock-axios'

import { render, waitFor, cleanup } from '~helpers/test.helpers'
import ChampionshipRaceDateSelectionContainer from './race-date-selection.container'
import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'

describe('Championship Race Dates Selection', () => {
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

  const initialState: {
    championshipCreation: ChampionshipCreationSliceInitialState
  } = {
    championshipCreation: {
      basicInfo: undefined,
      tracks,
      races: [
        {
          id: '1',
          track: tracks[0],
          isCompleted: false,
          startDate: undefined
        },
        {
          id: '2',
          track: tracks[1],
          isCompleted: false,
          startDate: undefined
        }
      ]
    }
  }

  afterEach(() => {
    mockAxios.reset()
    cleanup()
  })

  it('should render all the Races', async () => {
    const { getByText, queryAllByText } = render(
      <ChampionshipRaceDateSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    await waitFor(async () => getByText(/selecionar data das corridas/i))

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))
    await waitFor(async () => getByText(/circuit de barcelona-catalunya/i))

    await waitFor(async () =>
      expect(queryAllByText(/toque para selecionar a data/i)).toHaveLength(2)
    )
  })

  it('should render all the Races', async () => {
    const { getByText, queryAllByText } = render(
      <ChampionshipRaceDateSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    await waitFor(async () => getByText(/selecionar data das corridas/i))

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))
    await waitFor(async () => getByText(/circuit de barcelona-catalunya/i))

    await waitFor(async () =>
      expect(queryAllByText(/toque para selecionar a data/i)).toHaveLength(2)
    )
  })
})
