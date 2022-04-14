import * as React from 'react'
import MockAdapter from 'axios-mock-adapter'

import { render, waitFor, cleanup } from '~helpers/test.helpers'
import RacePenaltiesAndBonificationsContainer from './race-penalties-and-bonifications.container'
import { API_URL } from '~constants/config.constants'
import api from '~api/axios.api'

describe('Race Penalties and Bonifications', () => {
  const axiosMock = new MockAdapter(api)
  beforeAll(() => {
    axiosMock.reset()
  })

  afterAll(cleanup)

  const drivers = [
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
        id: '622bedfbe669549ffd44d2bb'
      },
      isRegistered: true,
      bonifications: [
        {
          bonification: {
            name: 'Volta mais rápida',
            points: 1,
            id: '622bedfbe669549ffd44d2c4'
          },
          race: '620d62cb4e71a03355490929'
        },
        {
          bonification: {
            name: 'Volta mais rápida',
            points: 1,
            id: '622bedfbe669549ffd44d2c1'
          },
          race: '620d62cb4e71a03355490922'
        }
      ],
      penalties: []
    },
    {
      user: {
        firstName: 'Gustavo',
        lastName: 'Rocha',
        userName: 'gustavo.rocha',
        profileImageUrl:
          'https://sim-racer-app.s3.sa-east-1.amazonaws.com/profile-images/JCa6Fohb3lhVqw9ltPhn1VxmVBs1.jpeg',
        id: 'JCa6Fohb3lhVqw9ltPhn1VxmVBs1'
      },
      team: {
        name: 'Ferrari',
        color: '#F60000',
        id: '622bedfbe669549ffd44d2bd'
      },
      isRegistered: true,
      bonifications: [],
      penalties: [
        {
          penalty: {
            name: 'Colisão',
            points: 5,
            id: '622bedfbe669549ffd44d2c6'
          },
          race: '620d62cb4e71a03355490929'
        },
        {
          penalty: {
            name: 'Colisão',
            points: 5,
            id: '622bedfbe669549ffd44d2c1'
          },
          race: '620d62cb4e71a03355490922'
        }
      ]
    },
    {
      id: 'a584c71e-126d-4669-af46-67ae7e5b0e58',
      firstName: 'Charles',
      lastName: 'Leclerc',
      team: {
        name: 'Ferrari',
        color: '#F60000',
        id: '622bedfbe669549ffd44d2bd'
      },
      isRegistered: false,
      bonifications: [],
      penalties: []
    },
    {
      id: 'afbf4b0f-26d8-443d-bcba-50009edcb216',
      firstName: 'Max',
      lastName: 'Verstappen',
      team: {
        name: 'Red Bull',
        color: '#002776',
        id: '622bedfbe669549ffd44d2bc'
      },
      isRegistered: false,
      bonifications: [],
      penalties: []
    },
    {
      id: 'c618cd64-b519-495a-899d-17002c06bcc4',
      firstName: 'Sérgio',
      lastName: 'Pérez',
      team: {
        name: 'Red Bull',
        color: '#002776',
        id: '622bedfbe669549ffd44d2bc'
      },
      isRegistered: false,
      bonifications: [],
      penalties: []
    },
    {
      id: '6075a70c-4cd8-4109-aa3e-7e4f59585845',
      firstName: 'Lewis',
      lastName: 'Hamilton',
      team: {
        name: 'Mercedes',
        color: '#03BFB5',
        id: '622bedfbe669549ffd44d2bb'
      },
      isRegistered: false,
      bonifications: [],
      penalties: []
    },
    {
      id: '3199ef2c-b70f-4bba-9de7-6a2512fc6e52',
      firstName: 'George',
      lastName: 'Russell',
      team: {
        name: 'Mercedes',
        color: '#03BFB5',
        id: '622bedfbe669549ffd44d2bb'
      },
      isRegistered: false,
      bonifications: [],
      penalties: []
    }
  ]

  it('should render all the penalties and bonifications', async () => {
    await axiosMock
      .onGet(`${API_URL}/api/race/620d62cb4e71a03355490929`)
      .reply(200, {
        id: '620d62cb4e71a03355490929',
        championship: '620d62cb4e71a03355490930',
        track: {
          name: 'Bahrain International Circuit',
          countryCode: 'BH',
          countryName: 'Bahrain',
          id: '61fdd80633035841deb311e9'
        },
        startDate: '2022-03-12T00:46:40.596Z',
        isCompleted: true,
        classification: '622bedfbe669549ffd44d2cf'
      })

    axiosMock
      .onGet(`${API_URL}/api/championship/620d62cb4e71a03355490930`)
      .reply(200, {
        id: '620d62cb4e71a03355490930',
        drivers
      })

    const { getByText, queryAllByText } = render(
      <RacePenaltiesAndBonificationsContainer />
    )

    await waitFor(async () => {
      getByText(/Bahrain International Circuit/i)

      getByText(/volta mais rápida/i)
      getByText('+1 ponto')

      getByText(/colisão/i)
      getByText('-5 pontos')

      expect(queryAllByText(/volta mais rápida/i)).toHaveLength(1)
      expect(queryAllByText(/colisão/i)).toHaveLength(1)
    })
  })
})
