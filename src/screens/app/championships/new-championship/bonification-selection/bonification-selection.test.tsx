import * as React from 'react'
import { render, fireEvent, waitFor } from '~helpers/test.helpers'
import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'
import ChampionshipBonificationSelectionContainer from './bonification-selection.container'

describe('Championship Bonifications Selection', () => {
  it('should render the initial screen', async () => {
    const { getByPlaceholderText, getByText, queryByLabelText } = render(
      <ChampionshipBonificationSelectionContainer />
    )

    getByPlaceholderText(/nome/i)
    getByPlaceholderText(/pontos/i)
    getByText('Adicionar')
    getByText(/pular/i)

    expect(queryByLabelText(/remove/i)).toBeNull()
  })

  it('should show an error if trying to add without providing name and points', async () => {
    const { getByText, queryByLabelText } = render(
      <ChampionshipBonificationSelectionContainer />
    )

    const addButton = getByText('Adicionar')

    fireEvent.press(addButton)

    await waitFor(async () => getByText(/o nome é obrigatório/i))
    await waitFor(async () => getByText(/os pontos são obrigatórios/i))

    expect(queryByLabelText(/remove/i)).toBeNull()
  })

  it('should add a Bonification', async () => {
    const {
      getByText,
      queryAllByLabelText,
      getByPlaceholderText,
      getByLabelText,
      getByDisplayValue
    } = render(<ChampionshipBonificationSelectionContainer />)

    fireEvent.changeText(getByPlaceholderText(/nome/i), 'Volta mais rápida')
    fireEvent.changeText(getByPlaceholderText(/pontos/i), '1')

    fireEvent.press(getByText('Adicionar'))

    await waitFor(async () => {
      getByLabelText(/remover volta mais rápida/i)

      getByDisplayValue('Volta mais rápida')
      getByDisplayValue('1')
    })

    expect(queryAllByLabelText(/remove/i)).toHaveLength(1)
  })

  it('should remove a Bonification', async () => {
    const {
      getByText,
      queryByDisplayValue,
      getByPlaceholderText,
      queryByLabelText,
      getByLabelText,
      getByDisplayValue
    } = render(<ChampionshipBonificationSelectionContainer />)

    fireEvent.changeText(getByPlaceholderText(/nome/i), 'Volta mais rápida')
    fireEvent.changeText(getByPlaceholderText(/pontos/i), '1')

    fireEvent.press(getByText('Adicionar'))

    await waitFor(async () => {
      getByLabelText(/remover volta mais rápida/i)

      getByDisplayValue('Volta mais rápida')
      getByDisplayValue('1')
    })

    fireEvent.press(getByLabelText(/remover volta mais rápida/i))

    await waitFor(async () => {
      expect(queryByDisplayValue(/volta mais rápida/i)).toBeNull()
      expect(queryByDisplayValue(/1/i)).toBeNull()

      expect(queryByLabelText(/remove/i)).toBeNull()
    })
  })

  it('should show default Bonifications from Redux', async () => {
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
        bonifications: [{ id: '1', name: 'Volta mais rápida', points: 1 }]
      }
    }

    const { queryAllByLabelText, getByDisplayValue } = render(
      <ChampionshipBonificationSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    getByDisplayValue('Volta mais rápida')
    getByDisplayValue('1')
    expect(queryAllByLabelText(/remove/i)).toHaveLength(1)
  })
})
