import React from 'react'
import ChampionshipEntryRequestModalContainer from './championship-entry-request-modal.container'
import { render, waitFor } from '~helpers/test.helpers'
import MockHelpers from '~helpers/mock.helpers'

describe('Championship Entry Request Modal', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  const preloadedState = {
    championshipDetails: {
      championshipDetails: {
        id: '620d62cb4e71a03355490930'
      }
    }
  }

  it('should render (with no teams)', async () => {
    axiosMock.onGet().reply(200, [])

    const { getByText, queryAllByPlaceholderText } = render(
      <ChampionshipEntryRequestModalContainer
        isVisible
        setIsVisible={() => {}}
      />,
      {
        preloadedState
      }
    )

    getByText(/deseja mesmo solicitar a entrada neste campeonato?/i)
    getByText(/confirmar/i)
    getByText(/cancelar/i)
    expect(queryAllByPlaceholderText(/time/i)).toHaveLength(1)
  })

  it('should render (with teams)', async () => {
    axiosMock.onGet().reply(200, [
      {
        id: 'valid_id',
        name: 'valid_name',
        color: 'valid_color'
      }
    ])

    const { getByText, queryAllByPlaceholderText } = render(
      <ChampionshipEntryRequestModalContainer
        isVisible
        setIsVisible={() => {}}
      />,
      { preloadedState }
    )

    await waitFor(async () => {
      getByText(/selecione o time com o qual você quer entrar/i)
      getByText(/confirmar/i)
      getByText(/cancelar/i)
      expect(queryAllByPlaceholderText(/time/i)).toHaveLength(2)
    })
  })
})
