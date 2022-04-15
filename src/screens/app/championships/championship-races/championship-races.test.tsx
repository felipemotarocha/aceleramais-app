import React from 'react'

import ChampionshipRacesContainer from './championship-races.container'

import { render, waitFor } from '~helpers/test.helpers'
import Colors from '~constants/colors.constants'
import MockHelpers from '~helpers/mock.helpers'

describe('Championship Races', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  it('should show all the races', async () => {
    axiosMock.onGet().reply(200, [
      {
        id: '620d62cb4e71a03355490939',
        championship: '620d62cb4e71a03355490930',
        track: {
          name: 'Melbourne Grand Prix Circuit',
          countryCode: 'AU',
          countryName: 'Austrália',
          id: '61fdd80633035841deb311e8'
        },
        startDate: '2022-02-01T19:52:41.947Z',
        isCompleted: true,
        classification: '620d62cb4e71a0335549093a'
      },
      {
        id: '620d62cb4e71a0335549093e',
        championship: '620d62cb4e71a03355490930',
        track: {
          name: 'Autódromo José Carlos Pace',
          countryCode: 'BR',
          countryName: 'Brasil',
          id: '61fdd80633035841deb311ff'
        },
        startDate: '2022-02-02T19:52:41.947Z',
        isCompleted: false,
        classification: '620d62cb4e71a0335549093f'
      }
    ])

    const { getByText } = render(<ChampionshipRacesContainer />)

    await waitFor(async () => {
      getByText(/Melbourne Grand Prix Circuit/i)
      expect(getByText(/Melbourne Grand Prix Circuit/i)).toHaveStyle({
        color: Colors.textSecondary
      })

      getByText(/Autódromo José Carlos Pace/i)
      expect(getByText(/Autódromo José Carlos Pace/i)).toHaveStyle({
        color: Colors.text
      })
    })
  })
})
