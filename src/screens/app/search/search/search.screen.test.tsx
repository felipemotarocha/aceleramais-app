import * as React from 'react'

import MockHelpers from '~helpers/mock.helpers'
import { render, fireEvent, waitFor } from '~helpers/test.helpers'
import ChampionshipStubs from '~stubs/championship.stubs'

import SearchScreen from './search.screen'

describe('Search Screen', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  it('should render initial screen', () => {
    const { getByText, getByPlaceholderText } = render(<SearchScreen />)

    getByText(/pesquisar/i)
    getByPlaceholderText(/nome ou código do campeonato/i)
    getByText(/não há campeonatos para exibir/i)
  })

  it('should search championships by name', async () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <SearchScreen />
    )

    fireEvent.changeText(
      getByPlaceholderText(/nome ou código do campeonato/i),
      'psgl'
    )

    axiosMock
      .onGet('/api/championship?nameOrCode=psgl')
      .reply(200, [ChampionshipStubs.validChampionships[0]])

    fireEvent(getByDisplayValue(/psgl/i), 'submitEditing')

    await waitFor(async () => {
      getByText(/psgl sim racing league/i)

      getByText(/código:/i)
      getByText(/#12345678/i)

      getByText(/plataforma:/i)
      getByText(/pc/i)

      getByText(/próxima corrida:/i)
      getByText('19/04/2022, 15:52')
    })
  })

  it('should search championships by code', async () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <SearchScreen />
    )

    fireEvent.changeText(
      getByPlaceholderText(/nome ou código do campeonato/i),
      '#123'
    )

    axiosMock
      .onGet('/api/championship?nameOrCode=123')
      .reply(200, [ChampionshipStubs.validChampionships[0]])

    fireEvent(getByDisplayValue(/123/i), 'submitEditing')

    await waitFor(async () => {
      getByText(/psgl sim racing league/i)

      getByText(/código:/i)
      getByText(/#12345678/i)

      getByText(/plataforma:/i)
      getByText(/pc/i)

      getByText(/próxima corrida:/i)
      getByText('19/04/2022, 15:52')
    })
  })

  it('should show an empty message when there is no results', async () => {
    const { getByPlaceholderText, getByText, getByDisplayValue } = render(
      <SearchScreen />
    )

    fireEvent.changeText(
      getByPlaceholderText(/nome ou código do campeonato/i),
      '#123'
    )

    axiosMock.onGet('/api/championship?nameOrCode=123').reply(200, [])

    fireEvent(getByDisplayValue(/123/i), 'submitEditing')

    await waitFor(async () => {
      getByText(/não há campeonatos para exibir/i)
    })
  })
})
