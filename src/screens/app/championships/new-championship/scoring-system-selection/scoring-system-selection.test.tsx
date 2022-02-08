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

  it('should add a position score', async () => {
    const {
      getByText,
      queryAllByLabelText,
      getByPlaceholderText,
      getByLabelText,
      queryByText,
      getByDisplayValue
    } = render(<ChampionshipScoringSystemSelectionContainer />)

    const input = getByPlaceholderText(/pontos 1º lugar/i)

    fireEvent.changeText(input, '25')

    const addButton = getByText(/adicionar/i)

    fireEvent.press(addButton)

    await waitFor(async () => {
      getByLabelText(/remove 1/i)
      getByText(/1º lugar/i)
      getByDisplayValue('25')

      getByPlaceholderText(/pontos 2º lugar/i)
    })

    expect(queryAllByLabelText(/remove/i)).toHaveLength(1)
    expect(queryByText(/os pontos são obrigatórios/i)).toBeNull()
  })

  it('should remove the first position', async () => {
    const {
      getByText,
      queryAllByLabelText,
      getByPlaceholderText,
      getByLabelText,
      queryByText,
      getByDisplayValue,
      queryByDisplayValue
    } = render(<ChampionshipScoringSystemSelectionContainer />)

    const addButton = getByText(/adicionar/i)

    fireEvent.changeText(getByPlaceholderText(/pontos 1º lugar/i), '25')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 2º lugar/i))

    fireEvent.changeText(getByPlaceholderText(/pontos 2º lugar/i), '20')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 3º lugar/i))

    fireEvent.changeText(getByPlaceholderText(/pontos 3º lugar/i), '18')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 4º lugar/i))

    fireEvent.press(getByLabelText(/remove 1/i))

    await waitFor(async () => getByPlaceholderText(/pontos 3º lugar/i))

    expect(queryAllByLabelText(/remove/i)).toHaveLength(2)

    getByText(/1º lugar/i)
    getByDisplayValue('20')

    getByText(/2º lugar/i)
    getByDisplayValue('18')

    expect(queryByText(/3º lugar/i)).toBeNull()
    expect(queryByDisplayValue('25')).toBeNull()
  })

  it('should remove the second (middle) position', async () => {
    const {
      getByText,
      queryAllByLabelText,
      getByPlaceholderText,
      getByLabelText,
      queryByText,
      getByDisplayValue,
      queryByDisplayValue
    } = render(<ChampionshipScoringSystemSelectionContainer />)

    const addButton = getByText(/adicionar/i)

    fireEvent.changeText(getByPlaceholderText(/pontos 1º lugar/i), '25')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 2º lugar/i))

    fireEvent.changeText(getByPlaceholderText(/pontos 2º lugar/i), '20')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 3º lugar/i))

    fireEvent.changeText(getByPlaceholderText(/pontos 3º lugar/i), '18')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 4º lugar/i))

    fireEvent.press(getByLabelText(/remove 2/i))

    await waitFor(async () => getByPlaceholderText(/pontos 3º lugar/i))

    expect(queryAllByLabelText(/remove/i)).toHaveLength(2)

    getByText(/1º lugar/i)
    getByDisplayValue('25')

    getByText(/2º lugar/i)
    getByDisplayValue('18')

    expect(queryByText(/3º lugar/i)).toBeNull()
    expect(queryByDisplayValue('20')).toBeNull()
  })

  it('should remove the third (last) position', async () => {
    const {
      getByText,
      queryAllByLabelText,
      getByPlaceholderText,
      getByLabelText,
      queryByText,
      getByDisplayValue,
      queryByDisplayValue
    } = render(<ChampionshipScoringSystemSelectionContainer />)

    const addButton = getByText(/adicionar/i)

    fireEvent.changeText(getByPlaceholderText(/pontos 1º lugar/i), '25')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 2º lugar/i))

    fireEvent.changeText(getByPlaceholderText(/pontos 2º lugar/i), '20')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 3º lugar/i))

    fireEvent.changeText(getByPlaceholderText(/pontos 3º lugar/i), '18')
    fireEvent.press(addButton)

    await waitFor(async () => getByPlaceholderText(/pontos 4º lugar/i))

    fireEvent.press(getByLabelText(/remove 3/i))

    await waitFor(async () => getByPlaceholderText(/pontos 3º lugar/i))

    expect(queryAllByLabelText(/remove/i)).toHaveLength(2)

    getByText(/1º lugar/i)
    getByDisplayValue('25')

    getByText(/2º lugar/i)
    getByDisplayValue('20')

    expect(queryByText(/3º lugar/i)).toBeNull()
    expect(queryByDisplayValue('18')).toBeNull()
  })
})
