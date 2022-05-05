const ChampionshipStubs = {
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
            id: 'ohYViVrxyCakFXTrUdlS981v8Pf2'
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
            id: 'ohYViVrxyCakFXTrUdlS981v8Pf2'
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
      driverStandings: '6259bf61c5112dc1e32a1e3b',
      teamStandings: '6259bf61c5112dc1e32a1e3d',
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
          isCompleted: false,
          id: '6259bf61c5112dc1e32a1e4a'
        },
        {
          track: {
            name: 'Circuit de Monaco',
            countryCode: 'MC',
            id: '624ef8a7a48d056271814beb'
          },
          startDate: '2022-04-28T18:52:12.000Z',
          isCompleted: false,
          id: '6259bf61c5112dc1e32a1e4f'
        },
        {
          track: {
            name: 'Autódromo José Carlos Pace',
            countryCode: 'BR',
            id: '624ef8a7a48d056271814bfc'
          },
          startDate: '2022-05-06T18:52:12.000Z',
          isCompleted: false,
          id: '6259bf61c5112dc1e32a1e54'
        }
      ]
    }
  ]
}

export default ChampionshipStubs
