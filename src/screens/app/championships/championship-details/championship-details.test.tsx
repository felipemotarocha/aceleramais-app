import React from 'react'
import axiosMock from 'axios'

import { render, waitFor } from '~helpers/test.helpers'

import ChampionshipDetailsContainer from './championship-details.container'
import ChampionshipDetailsStubs from './championship-details.stubs'

describe('Championship Details', () => {
  beforeEach(() => {})

  it('should render the header', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: ChampionshipDetailsStubs.validResponse
    })

    const { getByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => getByText(/psgl sim racing league/i))
    await waitFor(async () => getByText(/plataforma/i))
    await waitFor(async () => getByText(/descrição/i))
    await waitFor(async () => getByText(/join us./i))
  })

  it('should render the next races', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: ChampionshipDetailsStubs.validResponse
    })

    const { getByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => {
      getByText(/próximas corridas/i)

      getByText(/melbourne grand prix circuit/i)
      getByText('01/02/2022, 16:52')

      getByText(/autódromo josé carlos pace/i)
      getByText('02/02/2022, 16:52')

      getByText(/ver todas as corridas/i)
    })
  })

  it('should show the leading drivers', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: ChampionshipDetailsStubs.validResponse
    })

    const { getByText, queryAllByText } = render(
      <ChampionshipDetailsContainer />
    )

    await waitFor(async () => {
      getByText(/felipe/i)
      getByText(/25 pontos/i)

      getByText(/gustavo/i)
      getByText(/20 pontos/i)

      expect(queryAllByText(/rocha/i)).toHaveLength(2)

      getByText(/max/i)
      getByText(/verstappen/i)
      getByText(/18 pontos/i)

      getByText(/ver classificação completa/i)
    })
  })

  it('should show an warning if there is no leading drivers', async () => {
    ;(axiosMock.get as any).mockResolvedValue({
      data: {
        ...ChampionshipDetailsStubs.validResponse,
        driverStandings: {
          standings: []
        }
      }
    })

    const { getByText, queryByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => {
      getByText(
        /os líderes ficarão disponíveis após a primeira corrida ser concluida./i
      )

      expect(queryByText(/ver classificação completa/i)).toBeNull()
    })
  })
})
