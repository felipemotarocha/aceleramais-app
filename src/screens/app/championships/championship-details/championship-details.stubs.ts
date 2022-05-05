const ChampionshipDetailsStubs = {
  validResponse: {
    id: '620d62cb4e71a03355490930',
    name: 'PSGL Sim Racing League',
    avatarImageUrl:
      'https://sim-racer-app.s3.sa-east-1.amazonaws.com/championship-images/620d62cb4e71a03355490930.jpeg',
    description: 'Join us.',
    platform: 'PS4/PS5',
    races: ['620d62cb4e71a03355490939', '620d62cb4e71a0335549093e'],
    admins: [
      {
        user: 'YaWOZoE596acPgLsg7CrAChrQjT2',
        isCreator: true
      }
    ],
    pendentDrivers: [],
    drivers: [
      {
        bonifications: [],
        penalties: [],
        user: 'JCa6Fohb3lhVqw9ltPhn1VxmVBs1',
        isRegistered: true,
        team: '620d62cb4e71a03355490931'
      },
      {
        bonifications: [],
        penalties: [],
        user: 'YaWOZoE596acPgLsg7CrAChrQjT2',
        isRegistered: true,
        team: '620d62cb4e71a03355490931'
      }
    ],
    teams: ['620d62cb4e71a03355490931'],
    driverStandings: {
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
            lastName: 'Rocha',
            userName: 'gustavo.rocha',
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
          id: '1',
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
          id: '2',
          firstName: 'Charles',
          lastName: 'Leclerc',
          team: {
            name: 'Mercedes',
            color: '#03BFB5',
            id: '620d62cb4e71a03355490931'
          },
          isRegistered: false,
          position: 3,
          points: 18
        }
      ],
      id: '620d62cb4e71a03355490933'
    },
    teamStandings: {
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
      ],
      id: '620d62cb4e71a03355490935'
    },
    scoringSystem: '620d62cb4e71a03355490937',
    bonifications: [],
    penalties: [],
    nextRaces: [
      {
        track: {
          name: 'Melbourne Grand Prix Circuit',
          countryCode: 'AU',
          countryName: 'Austrália',
          id: '61fdd80633035841deb311e8'
        },
        startDate: '2022-02-01T19:52:41.947Z',
        id: '620d62cb4e71a03355490939'
      },
      {
        track: {
          name: 'Autódromo José Carlos Pace',
          countryCode: 'BR',
          countryName: 'Brasil',
          id: '61fdd80633035841deb311ff'
        },
        startDate: '2022-02-02T19:52:41.947Z',
        id: '620d62cb4e71a0335549093e'
      }
    ]
  }
}

export default ChampionshipDetailsStubs
