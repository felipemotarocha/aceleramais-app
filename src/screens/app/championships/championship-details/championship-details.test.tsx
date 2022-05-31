import React from 'react'

import { render, waitFor } from '~helpers/test.helpers'

import ChampionshipDetailsContainer from './championship-details.container'
import ChampionshipDetailsStubs from './championship-details.stubs'
import MockHelpers from '~helpers/mock.helpers'

describe('Championship Details', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  beforeEach(() => {})

  it('should render the header', async () => {
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse
    })

    const { getByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => getByText(/psgl/i))
    await waitFor(async () => getByText(/plataforma/i))
    await waitFor(async () => getByText(/descrição/i))
    await waitFor(async () => getByText(/join us/i))
  })

  it('should render the next races', async () => {
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse
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
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse,
      teamStandings: { standings: [] }
    })

    const { getByText, queryAllByText } = render(
      <ChampionshipDetailsContainer />
    )

    await waitFor(async () => {
      getByText(/líderes/i)

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
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse,
      driverStandings: {
        standings: []
      },
      teamStandings: {
        standings: []
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

  it('should show an warning if there is no drivers', async () => {
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse,
      driverStandings: {
        standings: []
      },
      teamStandings: {
        standings: []
      },
      drivers: []
    })

    const { getByText, queryByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => {
      getByText(/este campeonato não possui nenhum piloto./i)

      expect(queryByText(/ver classificação completa/i)).toBeNull()
    })
  })

  it('should show the leading teams', async () => {
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse,
      driverStandings: { standings: [] }
    })

    const { getByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => {
      getByText(/mercedes/i)
      getByText(/81 pontos/i)

      getByText(/ver classificação completa/i)
    })
  })

  it('should show an warning if there is no leading teams', async () => {
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse,
      driverStandings: {
        standings: []
      },
      teamStandings: {
        standings: []
      }
    })

    const { getByText, queryByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => {
      getByText(
        /os times ficarão disponíveis após a primeira corrida ser concluida./i
      )

      expect(queryByText(/ver classificação completa/i)).toBeNull()
    })
  })

  it('should show an warning if there is no teams', async () => {
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse,
      driverStandings: {
        standings: []
      },
      teamStandings: {
        standings: []
      },
      drivers: [],
      teams: []
    })

    const { getByText, queryByText } = render(<ChampionshipDetailsContainer />)

    await waitFor(async () => {
      getByText(/este campeonato não possui nenhum time./i)

      expect(queryByText(/ver classificação completa/i)).toBeNull()
    })
  })

  it('should show entry request button if the current user is not on the championship', async () => {
    axiosMock.onGet().reply(200, {
      ...ChampionshipDetailsStubs.validResponse,
      driverStandings: { standings: [] }
    })

    const { getByText } = render(<ChampionshipDetailsContainer />, {
      preloadedState: {
        user: {
          currentUser: {
            id: '1yqRUUO3tJTL8QHp3ssoxeK03rB3',
            firstName: 'Gustavo',
            lastName: 'Rocha',
            email: 'gustavo.rocha@gmail.com',
            userName: '123456',
            provider: 'firebase'
          }
        }
      }
    })

    await waitFor(async () => {
      getByText(/solicitar entrada/i)
    })
  })
})
