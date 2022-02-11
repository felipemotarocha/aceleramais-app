import * as React from 'react'

import ChampionshipDriverSelectionContainer from './driver-selection.container'

import { render, waitFor } from '~helpers/test.helpers'
import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'

describe('Championship Driver Selection', () => {
  const initialState: {
    championshipCreation: ChampionshipCreationSliceInitialState
  } = {
    championshipCreation: {
      basicInfo: undefined,
      tracks: [],
      races: [],
      drivers: [],
      teams: [
        {
          id: '1',
          color: 'red',
          name: 'Ferrari'
        }
      ],

      scoringSystem: []
    }
  }

  it('should render the initial screen (no teams selected)', async () => {
    const { getByText, getByPlaceholderText, queryByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />
    )

    getByPlaceholderText(/nome e sobrenome/i)
    getByText(/piloto possui conta no sim racer/i)
    getByText(/adicionar/i)

    getByText(/pular/i)

    await waitFor(async () => expect(queryByPlaceholderText('Time')).toBeNull())
  })

  it('should render the initial screen (with teams selected)', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      { preloadedState: initialState }
    )

    getByPlaceholderText(/nome e sobrenome/i)
    getByText(/piloto possui conta no sim racer/i)
    getByText(/adicionar/i)
    getByText(/pular/i)

    await waitFor(async () => getByPlaceholderText('Time'))
  })
})
