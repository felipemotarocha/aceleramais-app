import React from 'react'
import MockHelpers from '~helpers/mock.helpers'

import { render, waitFor } from '~helpers/test.helpers'

import ChampionshipDriverStandingsContainer from './championship-driver-standings.container'

describe('Championship Driver Standings', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  it('should show the standings', async () => {
    axiosMock.onGet().reply(200, {
      id: '620d62cb4e71a03355490933',
      championship: '620d62cb4e71a03355490930',
      standings: [
        {
          user: {
            firstName: 'Felipe',
            lastName: 'Rocha',
            userName: 'felipe.rocha',
            profileImageUrl:
              'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/YaWOZoE596acPgLsg7CrAChrQjT2.jpeg',
            id: 'YaWOZoE596acPgLsg7CrAChrQjT2'
          },
          team: {
            name: 'Mercedes',
            color: '#03BFB5',
            id: '620d62cb4e71a03355490931'
          },
          isRegistered: true,
          position: 1,
          points: 25
        },
        {
          user: {
            firstName: 'Gustavo',
            lastName: 'Mota',
            userName: 'gustavo.mota',
            profileImageUrl:
              'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/JCa6Fohb3lhVqw9ltPhn1VxmVBs1.jpeg',
            id: 'JCa6Fohb3lhVqw9ltPhn1VxmVBs1'
          },
          team: {
            name: 'Mercedes',
            color: '#03BFB5',
            id: '620d62cb4e71a03355490931'
          },
          isRegistered: true,
          position: 2,
          points: 20
        },
        {
          id: '3',
          firstName: 'Max',
          lastName: 'Verstappen',
          team: {
            name: 'Mercedes',
            color: '#03BFB5',
            id: '620d62cb4e71a03355490931'
          },
          isRegistered: false,
          position: 3,
          points: 18
        },
        {
          id: '4',
          firstName: 'Charles',
          lastName: 'Leclerc',
          team: {
            name: 'Mercedes',
            color: '#03BFB5',
            id: '620d62cb4e71a03355490931'
          },
          isRegistered: false,
          position: 4,
          points: 15
        }
      ]
    })

    const { getByText } = render(<ChampionshipDriverStandingsContainer />)

    await waitFor(async () => {
      getByText('Felipe')
      getByText('ROCHA')
      getByText('@felipe.rocha')
      getByText(/25 pontos/i)

      getByText('Gustavo')
      getByText('MOTA')
      getByText('@gustavo.mota')
      getByText(/20 pontos/i)

      getByText('Max')
      getByText('VERSTAPPEN')
      getByText(/18 pontos/i)

      getByText('Charles')
      getByText('LECLERC')
      getByText(/15 pontos/i)
    })
  })
})
