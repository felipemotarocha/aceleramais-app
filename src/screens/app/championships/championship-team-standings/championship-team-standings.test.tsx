import React from 'react'

import { render, waitFor } from '~helpers/test.helpers'

import ChampionshipTeamStandingsContainer from './championship-team-standings.container'
import MockHelpers from '~helpers/mock.helpers'

describe('Championship Team Standings', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  beforeAll(() => {
    axiosMock.reset()
  })

  it('should show the standings', async () => {
    axiosMock.onGet().reply(200, {
      id: '620d62cb4e71a03355490935',
      championship: '620d62cb4e71a03355490930',
      standings: [
        {
          team: {
            name: 'Mercedes',
            color: '#03BFB5',
            id: '620d62cb4e71a03355490931'
          },
          position: 1,
          points: 81
        }
      ]
    })

    const { getByText } = render(<ChampionshipTeamStandingsContainer />)

    await waitFor(async () => {
      getByText('Mercedes')
      getByText('81 pontos')
    })
  })
})
