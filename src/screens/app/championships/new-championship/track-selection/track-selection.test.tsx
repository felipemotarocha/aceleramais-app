import React from 'react'
import axiosMock from 'axios'

import { render, waitFor, fireEvent } from '~helpers/test.helpers'
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

  it('should render all the Tracks', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: initialState.championshipCreation.tracks
    })

    const { getByText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))
    await waitFor(async () => getByText(/circuit de barcelona-catalunya/i))
  })

  it('should select an unselected Track on press', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: initialState.championshipCreation.tracks
    })

    const { getByText, getByLabelText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    await waitFor(async () => getByText(/autódromo josé carlos pace/i))

    fireEvent.press(getByText(/autódromo josé carlos pace/i))

    expect(getByLabelText(/selected/i)).toBeDefined()
  })

  it('should filter the Tracks by Country Name based on the search input', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: initialState.championshipCreation.tracks
    })

    const { getByText, queryByText, getByPlaceholderText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    await waitFor(() => getByText(/autódromo josé carlos pace/i))
    await waitFor(() => getByText(/circuit de barcelona-catalunya/i))

    fireEvent.changeText(getByPlaceholderText(/buscar circuito.../i), 'Brasil')

    getByText(/autódromo josé carlos pace/i)
    expect(queryByText(/circuit de barcelona-catalunya/i)).toBeNull()
  })

  it('should filter the Tracks by Name based on the search input', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: initialState.championshipCreation.tracks
    })

    const { getByText, queryByText, getByPlaceholderText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    await waitFor(() => getByText(/autódromo josé carlos pace/i))
    await waitFor(() => getByText(/circuit de barcelona-catalunya/i))

    fireEvent.changeText(
      getByPlaceholderText(/buscar circuito.../i),
      'circuit de barcelona'
    )

    getByText(/circuit de barcelona-catalunya/i)
    expect(queryByText(/autódromo josé carlos pace/i)).toBeNull()
  })

  it('should show an error on submit if no Track is selected', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: initialState.championshipCreation.tracks
    })

    const { getByText } = render(
      <ChampionshipTrackSelectionContainer />,
      initialState as any
    )

    await waitFor(() => getByText(/autódromo josé carlos pace/i))
    await waitFor(() => getByText(/circuit de barcelona-catalunya/i))

    fireEvent.press(getByText(/avançar/i))

    await waitFor(() =>
      getByText(
        /você precisa selecionar pelo menos 1 circuito para continuar./i
      )
    )
  })
})
