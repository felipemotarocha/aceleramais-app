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
    getByText(/pular/i)
  })

  it('should show an error if trying to add a Team without providing a name', async () => {
    const { getByText } = render(<ChampionshipTeamSelectionContainer />)

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(() => getByText(/o nome é obrigatório./i))
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

  it('should delete a Team', async () => {
    const {
      getByText,
      getByPlaceholderText,
      getByLabelText,
      queryByText,
      queryAllByLabelText
    } = render(<ChampionshipTeamSelectionContainer />)

    fireEvent.changeText(getByPlaceholderText(/nome/i), 'Mercedes')

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(() => getByPlaceholderText(/nome/i))

    fireEvent.changeText(getByPlaceholderText(/nome/i), 'Ferrari')

    fireEvent.press(getByText(/adicionar/i))

    await waitFor(() => getByPlaceholderText(/nome/i))

    fireEvent.press(getByLabelText(/remove ferrari/i))

    await waitFor(async () => expect(queryByText(/ferrari/i)).toBeNull())

    expect(queryAllByLabelText(/remove/i)).toHaveLength(1)
  })
})
