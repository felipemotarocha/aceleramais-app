import React from 'react'
import mockAxios from 'jest-mock-axios'

import { render, waitFor, fireEvent, cleanup } from '~helpers/test.helpers'
import ChampionshipTrackSelectionContainer from './track-selection.container'

describe('Championship Tracks Selection', () => {
  const initialState = {
    championshipCreation: {
      basicInfo: undefined,
      tracks: [
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
    }
  }

  afterEach(() => {
    mockAxios.reset()
    cleanup()
  })

  it('should render all the Tracks', async () => {
    const { getByText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    const response = { data: initialState.championshipCreation.tracks }

    mockAxios.mockResponse(response)

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))
    await waitFor(async () => getByText(/circuit de barcelona-catalunya/i))
  })

  it('should select an unselected Track on press', async () => {
    const { getByText, getByLabelText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    const response = { data: initialState.championshipCreation.tracks }

    mockAxios.mockResponse(response)

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))

    fireEvent.press(getByText(/autódromo josé carlos pace/i))

    expect(getByLabelText(/selected/i)).toBeDefined()
  })

  it('should filter the Tracks by Country Name based on the search input', async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    const response = { data: initialState.championshipCreation.tracks }

    mockAxios.mockResponse(response)

    await waitFor(() => getByText(/autódromo josé carlos pace/i))
    await waitFor(() => getByText(/circuit de barcelona-catalunya/i))

    fireEvent.changeText(getByPlaceholderText(/buscar circuito.../i), 'Brasil')

    getByText(/autódromo josé carlos pace/i)
    expect(queryByText(/circuit de barcelona-catalunya/i)).toBeNull()
  })

  it('should filter the Tracks by Name based on the search input', async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    const response = { data: initialState.championshipCreation.tracks }

    mockAxios.mockResponse(response)

    await waitFor(() => getByText(/autódromo josé carlos pace/i))
    await waitFor(() => getByText(/circuit de barcelona-catalunya/i))

    fireEvent.changeText(
      getByPlaceholderText(/buscar circuito.../i),
      'circuit de barcelona'
    )

    getByText(/circuit de barcelona-catalunya/i)
    expect(queryByText(/autódromo josé carlos pace/i)).toBeNull()
  })
})
