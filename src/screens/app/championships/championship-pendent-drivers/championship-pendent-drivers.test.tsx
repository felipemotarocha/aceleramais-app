import React from 'react'
import MockHelpers from '~helpers/mock.helpers'
import { render, waitFor, fireEvent } from '~helpers/test.helpers'
import ChampionshipStubs from '~stubs/championship.stubs'
import ChampionshipPendentDriversContainer from './championship-pendent-drivers.container'

describe('Championship Pendent Drivers', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  const response = {
    ...ChampionshipStubs.validChampionships[0],
    pendentDrivers: [
      {
        user: {
          firstName: 'Gustavo',
          lastName: 'Rocha',
          userName: 'gustavo.rocha',
          id: 'QqZngOud4jX2HLsfgxpBy4rvAR63'
        },
        team: {
          name: 'Ferrari',
          color: '#F60000',
          id: '6259bf61c5112dc1e32a1e35'
        }
      }
    ]
  }

  it('should render pendent drivers', async () => {
    axiosMock.onGet().reply(200, response)

    const { getByText } = render(<ChampionshipPendentDriversContainer />)

    await waitFor(async () => {
      getByText('Gustavo')
      getByText('ROCHA')
      getByText('@gustavo.rocha')
      getByText(/aprovar/i)
      getByText(/reprovar/i)
    })
  })

  it('should mark a driver as approved on approve press', async () => {
    axiosMock.onGet().reply(200, response)

    const { getByText } = render(<ChampionshipPendentDriversContainer />)

    await waitFor(async () => {
      getByText('Gustavo')
      getByText('ROCHA')
      getByText('@gustavo.rocha')
      getByText(/aprovar/i)
      getByText(/reprovar/i)
    })

    await fireEvent.press(getByText(/aprovar/i))

    await waitFor(async () => {
      getByText(/aprovado/i)
    })
  })

  it('should mark a driver as reproved on reprove press', async () => {
    axiosMock.onGet().reply(200, response)

    const { getByText } = render(<ChampionshipPendentDriversContainer />)

    await waitFor(async () => {
      getByText('Gustavo')
      getByText('ROCHA')
      getByText('@gustavo.rocha')
      getByText(/aprovar/i)
      getByText(/reprovar/i)
    })

    await fireEvent.press(getByText(/reprovar/i))

    await waitFor(async () => {
      getByText(/reprovado/i)
    })
  })

  it('should undo an approval on undo press', async () => {
    axiosMock.onGet().reply(200, response)

    const { getByText, queryByText } = render(
      <ChampionshipPendentDriversContainer />
    )

    await waitFor(async () => {
      getByText('Gustavo')
      getByText('ROCHA')
      getByText('@gustavo.rocha')
      getByText(/aprovar/i)
      getByText(/reprovar/i)
    })

    await fireEvent.press(getByText(/aprovar/i))

    await waitFor(async () => {
      getByText(/aprovado/i)
      getByText(/desfazer/i)
    })

    await fireEvent.press(getByText(/desfazer/i))

    await waitFor(async () => {
      getByText(/aprovar/i)
      getByText(/reprovar/i)

      expect(queryByText(/desfazer/i)).toBeNull()
      expect(queryByText(/aprovado/i)).toBeNull()
    })
  })
})
