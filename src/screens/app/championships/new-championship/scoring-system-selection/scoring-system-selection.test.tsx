import * as React from 'react'
import { render, fireEvent, waitFor } from '~helpers/test.helpers'

import ChampionshipScoringSystemSelectionContainer from './scoring-system-selection.container'

describe('Championship Scoring System Selection', () => {
  it('should render the initial screen', async () => {
    const { getByPlaceholderText, getByText, queryByLabelText } = render(
      <ChampionshipScoringSystemSelectionContainer />
    )

    getByPlaceholderText(/pontos 1º lugar/i)
    getByText(/adicionar/i)
    getByText(/avançar/i)
    getByText(/coloque apenas as posições que pontuam/i)

    expect(queryByLabelText(/remove/i)).toBeNull()
  })

  it('should show an error if trying to add points without providing a position', async () => {
    const { getByText, queryByLabelText } = render(
      <ChampionshipScoringSystemSelectionContainer />
    )

    const addButton = getByText(/adicionar/i)

    fireEvent.press(addButton)

    await waitFor(async () => getByText(/os pontos são obrigatórios/i))

    expect(queryByLabelText(/remove/i)).toBeNull()
  })
})
