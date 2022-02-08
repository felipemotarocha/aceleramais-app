import * as React from 'react'
import { render } from '~helpers/test.helpers'

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
})
