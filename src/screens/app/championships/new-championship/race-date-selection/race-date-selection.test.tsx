import React from 'react'
import mockAxios from 'jest-mock-axios'

import { render, waitFor, cleanup, fireEvent } from '~helpers/test.helpers'
import ChampionshipRaceDateSelectionContainer from './race-date-selection.container'
import { ChampionshipCreationSliceInitialState } from '~store/championship-creation/championship-creation.slice'
import Colors from '~constants/colors.constants'

describe('Championship Race Dates Selection', () => {
  const tracks = [
    {
      id: '1',
      countryCode: 'BR',
      name: 'Autódromo José Carlos Pace',
      countryName: 'Brasil',
      isSelected: false
    },
    {
      id: '2',
      countryCode: 'ES',
      name: 'Circuit de Barcelona-Catalunya',
      countryName: 'Espanha',
      isSelected: false
    }
  ]

  const initialState: {
    championshipCreation: ChampionshipCreationSliceInitialState
  } = {
    championshipCreation: {
      basicInfo: undefined,
      tracks,
      races: [
        {
          id: '1',
          track: tracks[0],
          isCompleted: false,
          startDate: undefined
        },
        {
          id: '2',
          track: tracks[1],
          isCompleted: false,
          startDate: undefined
        }
      ]
    }
  }

  afterEach(() => {
    mockAxios.reset()
    cleanup()
  })

  it('should render all the Races', async () => {
    const { getByText, queryAllByText } = render(
      <ChampionshipRaceDateSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    await waitFor(async () => getByText(/selecionar data das corridas/i))

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))
    await waitFor(async () => getByText(/circuit de barcelona-catalunya/i))

    await waitFor(async () =>
      expect(queryAllByText(/toque para selecionar a data/i)).toHaveLength(2)
    )
  })

  it('should select a date', async () => {
    const { getByText, getByTestId, queryAllByText } = render(
      <ChampionshipRaceDateSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    const item = await waitFor(async () =>
      getByText(/autódromo josé carlos pace/i)
    )

    fireEvent.press(item)

    const confirmButton = getByTestId('DateTimePicker.Confirm')

    fireEvent.press(confirmButton)
    fireEvent.press(confirmButton)

    getByText(/toque para alterar a data/i)

    expect(queryAllByText(/toque para selecionar a data/i)).toHaveLength(1)
  })

  it('should remove a race', async () => {
    const { getByText, getByLabelText, queryByText } = render(
      <ChampionshipRaceDateSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))
    await waitFor(async () =>
      getByLabelText(/remove autódromo josé carlos pace/i)
    )

    const removeButton = getByLabelText(/remove autódromo josé carlos pace/i)

    await fireEvent.press(removeButton)

    expect(queryByText(/autódromo josé carlos pace/i)).toBeNull()

    getByText(/circuit de barcelona-catalunya/i)
  })

  it('should show an error when trying to submit without filling all race dates', async () => {
    const { getByText, getByTestId, queryByText } = render(
      <ChampionshipRaceDateSelectionContainer />,
      {
        preloadedState: initialState
      }
    )

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))
    await waitFor(async () => getByText(/circuit de barcelona-catalunya/i))

    const item = await waitFor(async () =>
      getByText(/autódromo josé carlos pace/i)
    )

    fireEvent.press(item)

    const confirmButton = getByTestId('DateTimePicker.Confirm')

    fireEvent.press(confirmButton)
    fireEvent.press(confirmButton)

    const submitButton = getByText(/avançar/i)

    await fireEvent.press(submitButton)

    expect(queryByText(/circuit de barcelona-catalunya/i)).toHaveStyle({
      color: Colors.error
    })
    expect(queryByText(/toque para selecionar a data/i)).toHaveStyle({
      color: Colors.error
    })

    getByText(/avançar/i)
  })
})
