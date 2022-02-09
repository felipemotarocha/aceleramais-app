import React from 'react'
import { render } from '~helpers/test.helpers'
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
})
