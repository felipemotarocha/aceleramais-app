import React from 'react'
import MockHelpers from '~helpers/mock.helpers'

import { render, waitFor } from '~helpers/test.helpers'
import ChampionshipStubs from '~stubs/championship.stubs'
import ChampionshipPendentDriversContainer from './championship-pendent-drivers.container'

describe('Championship Pendent Drivers', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  it('should render pendent drivers', async () => {
    axiosMock.onGet().reply(200, {
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
    })

    const { getByText } = render(<ChampionshipPendentDriversContainer />)

    await waitFor(async () => {
      getByText('Gustavo')
      getByText('ROCHA')
      getByText('@gustavo.rocha')
      getByText(/aprovar/i)
      getByText(/reprovar/i)
    })
  })
})
