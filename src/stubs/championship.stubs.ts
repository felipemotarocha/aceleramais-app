import Championship from '~types/championship.types'

const ChampionshipStubs: { validChampionships: Championship[] } = {
  validChampionships: [
    {
      id: '6259bf61c5112dc1e32a1e34',
      code: '12345678',
      name: 'PSGL Sim Racing League',
      avatarImageUrl:
        'https://sim-racer-app.s3.sa-east-1.amazonaws.com/championship-images/6259bf61c5112dc1e32a1e34.jpeg',
      description: 'Join us and start racing now!',
      platform: 'PC',
      races: [
        '6259bf61c5112dc1e32a1e45',
        '6259bf61c5112dc1e32a1e4a',
        '6259bf61c5112dc1e32a1e4f',
        '6259bf61c5112dc1e32a1e54'
      ],
      admins: [
        {
          user: {
            firstName: 'Felipe',
            lastName: 'Rocha',
            userName: 'felipe.rocha',
            profileImageUrl:
              'https://lh3.googleusercontent.com/a-/AOh14Gg-QreTOcdpYlm9Jys5-NnkxK1gXhoxm-X53FLwcQ=s96-c',
            id: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
            provider: 'firebase',
            email: 'felipe@rocha.com'
          },
          isCreator: true
        }
      ],
      pendentDrivers: [],
      drivers: [
        {
          user: {
            firstName: 'Felipe',
            lastName: 'Rocha',
            userName: 'felipe.rocha',
            profileImageUrl:
              'https://lh3.googleusercontent.com/a-/AOh14Gg-QreTOcdpYlm9Jys5-NnkxK1gXhoxm-X53FLwcQ=s96-c',
            id: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
            provider: 'firebase',
            email: 'felipe@rocha.com'
          },
          team: {
            name: 'Ferrari',
            color: '#F60000',
            id: '6259bf61c5112dc1e32a1e35'
          },
          isRegistered: true,
          isRemoved: false,
          bonifications: [],
          penalties: []
        },
        {
          id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
          firstName: 'Carlos',
          lastName: 'Sainz',
          team: {
            name: 'Ferrari',
            color: '#F60000',
            id: '6259bf61c5112dc1e32a1e35'
          },
          isRegistered: false,
          isRemoved: false,
          bonifications: [],
          penalties: []
        },
        {
          id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
          firstName: 'Max',
          lastName: 'Verstappen',
          team: {
            name: 'Red Bull',
            color: '#002776',
            id: '6259bf61c5112dc1e32a1e36'
          },
          isRegistered: false,
          isRemoved: false,
          bonifications: [],
          penalties: []
        },
        {
          id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
          firstName: 'Sérgio',
          lastName: 'Pérez',
          team: {
            name: 'Red Bull',
            color: '#002776',
            id: '6259bf61c5112dc1e32a1e36'
          },
          isRegistered: false,
          isRemoved: false,
          bonifications: [],
          penalties: []
        }
      ],
      teams: ['6259bf61c5112dc1e32a1e35', '6259bf61c5112dc1e32a1e36'],
      driverStandings: {
        standings: [
          {
            user: {
              firstName: 'Felipe',
              lastName: 'Rocha',
              userName: 'felipe.rocha',
              profileImageUrl:
                'https://lh3.googleusercontent.com/a-/AOh14Gg-QreTOcdpYlm9Jys5-NnkxK1gXhoxm-X53FLwcQ=s96-c',
              id: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
              provider: 'firebase',
              email: 'felipe@rocha.com'
            },
            team: {
              name: 'Ferrari',
              color: '#F60000',
              id: '6259bf61c5112dc1e32a1e35'
            },
            position: 1,
            points: 25,
            isRegistered: true
          },
          {
            id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
            firstName: 'Carlos',
            lastName: 'Sainz',
            team: {
              name: 'Ferrari',
              color: '#F60000',
              id: '6259bf61c5112dc1e32a1e35'
            },
            position: 2,
            points: 20,
            isRegistered: false
          },
          {
            id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
            firstName: 'Max',
            lastName: 'Verstappen',
            team: {
              name: 'Red Bull',
              color: '#002776',
              id: '6259bf61c5112dc1e32a1e36'
            },
            position: 3,
            points: 18,
            isRegistered: false
          },
          {
            id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
            firstName: 'Sérgio',
            lastName: 'Pérez',
            team: {
              name: 'Red Bull',
              color: '#002776',
              id: '6259bf61c5112dc1e32a1e36'
            },
            position: 4,
            points: 15,
            isRegistered: false
          }
        ],
        id: '6259bf61c5112dc1e32a1e3b'
      },
      teamStandings: {
        standings: [
          {
            team: {
              name: 'Ferrari',
              color: '#F60000',
              id: '6259bf61c5112dc1e32a1e35'
            },
            position: 1,
            points: 45
          },
          {
            team: {
              name: 'Red Bull',
              color: '#002776',
              id: '6259bf61c5112dc1e32a1e36'
            },
            position: 2,
            points: 33
          }
        ],
        id: '6259bf61c5112dc1e32a1e3d'
      },
      scoringSystem: '6259bf61c5112dc1e32a1e3f',
      bonifications: ['6259bf61c5112dc1e32a1e41'],
      penalties: ['6259bf61c5112dc1e32a1e43'],
      nextRaces: [
        {
          track: {
            name: 'Circuit de Barcelona-Catalunya',
            countryCode: 'ES',
            id: '624ef8a7a48d056271814bea'
          },
          startDate: '2022-04-19T18:52:12.000Z',
          id: '6259bf61c5112dc1e32a1e4a'
        },
        {
          track: {
            name: 'Circuit de Monaco',
            countryCode: 'MC',
            id: '624ef8a7a48d056271814beb'
          },
          startDate: '2022-04-28T18:52:12.000Z',
          id: '6259bf61c5112dc1e32a1e4f'
        },
        {
          track: {
            name: 'Autódromo José Carlos Pace',
            countryCode: 'BR',
            id: '624ef8a7a48d056271814bfc'
          },
          startDate: '2022-05-06T18:52:12.000Z',
          id: '6259bf61c5112dc1e32a1e54'
        }
      ]
    },
    {
      id: '6259bf61c5112dc1e32a1e34',
      code: '12345678',
      name: 'PSGL Sim Racing League',
      avatarImageUrl:
        'https://sim-racer.s3.sa-east-1.amazonaws.com/championship-images/6259bf61c5112dc1e32a1e34.jpeg',
      description: 'Join us and start racing now!',
      platform: 'PC',
      races: [
        {
          championship: '6259bf61c5112dc1e32a1e34',
          track: {
            name: 'Circuit Zandvoort',
            countryCode: 'NL',
            id: '624ef8a7a48d056271814be9'
          },
          startDate: '2022-04-15T18:52:12.912Z',
          isCompleted: true,
          classification: '6259bf61c5112dc1e32a1e46',
          id: '6259bf61c5112dc1e32a1e45'
        },
        {
          championship: '6259bf61c5112dc1e32a1e34',
          track: {
            name: 'Circuit de Barcelona-Catalunya',
            countryCode: 'ES',
            id: '624ef8a7a48d056271814bea'
          },
          startDate: '2022-04-19T18:52:12.000Z',
          isCompleted: true,
          classification: '6259bf61c5112dc1e32a1e4b',
          id: '6259bf61c5112dc1e32a1e4a'
        },
        {
          championship: '6259bf61c5112dc1e32a1e34',
          track: {
            name: 'Circuit de Monaco',
            countryCode: 'MC',
            id: '624ef8a7a48d056271814beb'
          },
          startDate: '2022-04-28T18:52:12.000Z',
          isCompleted: true,
          classification: '6259bf61c5112dc1e32a1e50',
          id: '6259bf61c5112dc1e32a1e4f'
        },
        {
          championship: '6259bf61c5112dc1e32a1e34',
          track: {
            name: 'Autódromo José Carlos Pace',
            countryCode: 'BR',
            id: '624ef8a7a48d056271814bfc'
          },
          startDate: '2022-05-06T18:52:12.000Z',
          isCompleted: false,
          classification: '6259bf61c5112dc1e32a1e55',
          id: '6259bf61c5112dc1e32a1e54'
        }
      ],
      admins: [
        {
          user: {
            firstName: 'Felipe',
            lastName: 'Rocha',
            userName: 'felipe.rocha',
            profileImageUrl:
              'https://lh3.googleusercontent.com/a-/AOh14Gg-QreTOcdpYlm9Jys5-NnkxK1gXhoxm-X53FLwcQ=s96-c',
            id: 'ohYViVrxyCakFXTrUdlS981v8Pf2'
          },
          isCreator: true
        }
      ],
      pendentDrivers: [
        {
          user: {
            firstName: 'Sim',
            lastName: 'Racer',
            userName: 'simracer',
            profileImageUrl:
              'https://lh3.googleusercontent.com/a/AATXAJwLv5x8YjCl-zN4plwFPMa4kk4XEZil77ihU3l7=s96-c',
            id: 'cgGVaihjpTWtiloYcYLxzzpl95V2'
          },
          team: {
            name: 'McLaren',
            color: '#FF9700',
            id: '62618f71e73e0fc8a51081b9',
            championship: '6259bf61c5112dc1e32a1e34'
          }
        }
      ],
      drivers: [
        {
          id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
          firstName: 'Carlos',
          lastName: 'Sainz',
          team: {
            name: 'Ferrari',
            color: '#F60000',
            id: '6259bf61c5112dc1e32a1e35'
          },
          isRegistered: false,
          isRemoved: false,
          bonifications: [],
          penalties: [
            {
              penalty: { id: '1', name: 'Colisão', points: 5 },
              race: '6259bf61c5112dc1e32a1e4a'
            }
          ]
        },
        {
          id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
          firstName: 'Max',
          lastName: 'Verstappen',
          team: {
            name: 'Red Bull',
            color: '#002776',
            id: '6259bf61c5112dc1e32a1e36'
          },
          isRegistered: false,
          isRemoved: false,
          bonifications: [],
          penalties: []
        },
        {
          id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
          firstName: 'Sérgio',
          lastName: 'Pérez',
          team: {
            name: 'Red Bull',
            color: '#002776',
            id: '6259bf61c5112dc1e32a1e36'
          },
          isRegistered: false,
          isRemoved: false,
          bonifications: [],
          penalties: []
        },
        {
          user: {
            firstName: 'Felipe',
            lastName: 'Rocha',
            userName: 'felipe.rocha',
            profileImageUrl:
              'https://lh3.googleusercontent.com/a-/AOh14Gg-QreTOcdpYlm9Jys5-NnkxK1gXhoxm-X53FLwcQ=s96-c',
            id: 'ohYViVrxyCakFXTrUdlS981v8Pf2'
          },
          team: {
            name: 'McLaren',
            color: '#FF9700',
            id: '62618f71e73e0fc8a51081b9'
          },
          isRegistered: true,
          isRemoved: true,
          bonifications: [
            {
              bonification: { id: '1', name: 'Volta mais rápida', points: 1 },
              race: '6259bf61c5112dc1e32a1e4a'
            }
          ],
          penalties: []
        },
        {
          user: {
            firstName: 'Sim',
            lastName: 'Racer',
            userName: 'simracer',
            profileImageUrl:
              'https://lh3.googleusercontent.com/a/AATXAJwLv5x8YjCl-zN4plwFPMa4kk4XEZil77ihU3l7=s96-c',
            id: 'cgGVaihjpTWtiloYcYLxzzpl95V2'
          },
          team: {
            name: 'McLaren',
            color: '#FF9700',
            id: '62618f71e73e0fc8a51081b9'
          },
          bonifications: [],
          penalties: [],
          isRegistered: true,
          isRemoved: false
        }
      ],
      teams: [
        {
          championship: '6259bf61c5112dc1e32a1e34',
          name: 'Ferrari',
          color: '#F60000',
          id: '6259bf61c5112dc1e32a1e35'
        },
        {
          championship: '6259bf61c5112dc1e32a1e34',
          name: 'Red Bull',
          color: '#002776',
          id: '6259bf61c5112dc1e32a1e36'
        },
        {
          championship: '6259bf61c5112dc1e32a1e34',
          name: 'McLaren',
          color: '#FF9700',
          id: '62618f71e73e0fc8a51081b9'
        }
      ],
      driverStandings: {
        standings: [
          {
            user: {
              firstName: 'Felipe',
              lastName: 'Rocha',
              userName: 'felipe.rocha',
              profileImageUrl:
                'https://lh3.googleusercontent.com/a-/AOh14Gg-QreTOcdpYlm9Jys5-NnkxK1gXhoxm-X53FLwcQ=s96-c',
              id: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
              email: 'felipe@rocha.com.br'
            },
            team: {
              name: 'McLaren',
              color: '#FF9700',
              id: '62618f71e73e0fc8a51081b9'
            },
            position: 1,
            points: 60,
            isRegistered: true
          },
          {
            id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
            firstName: 'Carlos',
            lastName: 'Sainz',
            team: {
              name: 'Ferrari',
              color: '#F60000',
              id: '6259bf61c5112dc1e32a1e35'
            },
            position: 2,
            points: 58,
            isRegistered: false
          },
          {
            id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
            firstName: 'Max',
            lastName: 'Verstappen',
            team: {
              name: 'Red Bull',
              color: '#002776',
              id: '6259bf61c5112dc1e32a1e36'
            },
            position: 3,
            points: 51,
            isRegistered: false
          },
          {
            id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
            firstName: 'Sérgio',
            lastName: 'Pérez',
            team: {
              name: 'Red Bull',
              color: '#002776',
              id: '6259bf61c5112dc1e32a1e36'
            },
            position: 4,
            points: 50,
            isRegistered: false
          }
        ],
        id: '6259bf61c5112dc1e32a1e3b'
      },
      teamStandings: {
        standings: [
          {
            team: {
              name: 'Red Bull',
              color: '#002776',
              id: '6259bf61c5112dc1e32a1e36'
            },
            position: 1,
            points: 101
          },
          {
            team: {
              name: 'McLaren',
              color: '#FF9700',
              id: '62618f71e73e0fc8a51081b9'
            },
            position: 2,
            points: 85
          },
          {
            team: {
              name: 'Ferrari',
              color: '#F60000',
              id: '6259bf61c5112dc1e32a1e35'
            },
            position: 3,
            points: 58
          }
        ],
        id: '6259bf61c5112dc1e32a1e3d'
      },
      scoringSystem: {
        championship: '6259bf61c5112dc1e32a1e34',
        scoringSystem: { '1': 25, '2': 20, '3': 18, '4': 15, '5': 10 },
        id: '627adee0690a7544eb4a0027'
      },
      bonifications: [
        {
          name: 'Volta mais rápida',
          points: 1,
          id: '6259bf61c5112dc1e32a1e41'
        }
      ],
      penalties: [
        {
          name: 'Colisão',
          points: 5,
          id: '6259bf61c5112dc1e32a1e43'
        }
      ],
      nextRaces: [
        {
          track: {
            name: 'Autódromo José Carlos Pace',
            countryCode: 'BR',
            id: '624ef8a7a48d056271814bfc'
          },
          startDate: '2022-05-06T18:52:12.000Z',
          id: '6259bf61c5112dc1e32a1e54'
        }
      ]
    }
  ]
}

export default ChampionshipStubs
