import React from 'react'
import { render, fireEvent, waitFor } from '~helpers/test.helpers'

import ChampionshipTeamSelectionContainer from './team-selection.container'

describe('Championship Team Selection', () => {
  it('should render the initial screen', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ChampionshipTeamSelectionContainer />
    )

    getByText(/selecionar times/i)
    getByText(/adicionar/i)
    getByPlaceholderText(/nome/i)
  })

  it('should add a Team with default color', async () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <ChampionshipTeamSelectionContainer />
    )

    fireEvent.changeText(getByPlaceholderText(/nome/i), 'Mercedes')

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(() => {
      getByText(/mercedes/i)
      getByLabelText(/remove mercedes/i)
    })
  })
})
