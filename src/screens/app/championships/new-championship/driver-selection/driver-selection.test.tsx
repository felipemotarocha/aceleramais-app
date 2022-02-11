import * as React from 'react'

import ChampionshipDriverSelectionContainer from './driver-selection.container'

import { render, waitFor, fireEvent } from '~helpers/test.helpers'
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

  it('should change input if driver has an account', async () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <ChampionshipDriverSelectionContainer />,
      { preloadedState: initialState }
    )

    fireEvent.press(getByLabelText(/piloto possui conta no sim racer?/i))

    await waitFor(async () => getByPlaceholderText('Nome de usuário'))
  })

  it('should show an error if trying to add a driver without providing a name', async () => {
    const { getByText } = render(<ChampionshipDriverSelectionContainer />)

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(async () => getByText(/o nome e sobrenome são obrigatórios/i))
  })

  it('should show an error if trying to add a driver without providing an user name', async () => {
    const { getByText, getByLabelText } = render(
      <ChampionshipDriverSelectionContainer />
    )

    fireEvent.press(getByLabelText(/piloto possui conta no sim racer?/i))

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(async () => getByText(/nome de usuário é obrigatório/i))
  })
})
