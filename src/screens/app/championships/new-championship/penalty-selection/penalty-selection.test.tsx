import * as React from 'react'
import { render, fireEvent, waitFor } from '~helpers/test.helpers'
import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'
import ChampionshipPenaltySelectionContainer from './penalty-selection.container'

describe('Championship Penalties Selection', () => {
  it('should render the initial screen', async () => {
    const { getByPlaceholderText, getByText, queryByLabelText } = render(
      <ChampionshipPenaltySelectionContainer />
    )

    getByPlaceholderText(/nome/i)
    getByPlaceholderText(/pontos/i)
    getByText('Adicionar')

    expect(queryByLabelText(/remove/i)).toBeNull()
  })

  it('should show an error if trying to add without providing name and points', async () => {
    const { getByText, queryByLabelText } = render(
      <ChampionshipPenaltySelectionContainer />
    )

    const addButton = getByText('Adicionar')

    fireEvent.press(addButton)

    await waitFor(async () => getByText(/o nome é obrigatório/i))
    await waitFor(async () => getByText(/os pontos são obrigatórios/i))

    expect(queryByLabelText(/remove/i)).toBeNull()
  })

  it('should add a Penalty', async () => {
    const {
      getByText,
      queryAllByLabelText,
      getByPlaceholderText,
      getByLabelText,
      getByDisplayValue
    } = render(<ChampionshipPenaltySelectionContainer />)

    fireEvent.changeText(getByPlaceholderText(/nome/i), 'Colisão')
    fireEvent.changeText(getByPlaceholderText(/pontos/i), '1')

    fireEvent.press(getByText('Adicionar'))

    await waitFor(async () => {
      getByLabelText(/remover colisão/i)

      getByDisplayValue('Colisão')
      getByDisplayValue('1')
    })

    expect(queryAllByLabelText(/remove/i)).toHaveLength(1)
  })

  it('should remove a Penalty', async () => {
    const {
      getByText,
      queryByDisplayValue,
      getByPlaceholderText,
      queryByLabelText,
      getByLabelText,
      getByDisplayValue
    } = render(<ChampionshipPenaltySelectionContainer />)

    fireEvent.changeText(getByPlaceholderText(/nome/i), 'Colisão')
    fireEvent.changeText(getByPlaceholderText(/pontos/i), '1')

    fireEvent.press(getByText('Adicionar'))

    await waitFor(async () => {
      getByLabelText(/remover colisão/i)

      getByDisplayValue('Colisão')
      getByDisplayValue('1')
    })

    fireEvent.press(getByLabelText(/remover colisão/i))

    await waitFor(async () => {
      expect(queryByDisplayValue(/colisão/i)).toBeNull()
      expect(queryByDisplayValue(/1/i)).toBeNull()

      expect(queryByLabelText(/remove/i)).toBeNull()
    })
  })

  it('should show default Penalties from Redux', async () => {
    const initialState: {
      championshipCreation: ChampionshipCreationSliceInitialState
    } = {
      championshipCreation: {
        basicInfo: undefined,
        tracks: [],
        races: [],
        drivers: [],
        teams: [],
        scoringSystem: [],
        bonifications: [],
        penalties: [{ id: '1', name: 'Colisão', points: 1 }]
      }
    }

    const { queryAllByLabelText, getByDisplayValue } = render(
      <ChampionshipPenaltySelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    getByDisplayValue('Colisão')
    getByDisplayValue('1')
    expect(queryAllByLabelText(/remove/i)).toHaveLength(1)
  })
})
