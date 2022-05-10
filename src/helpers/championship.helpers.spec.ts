import ChampionshipStubs from '~stubs/championship.stubs'
import ChampionshipHelpers from './championship.helpers'

describe('Championship Helpers', () => {
  it('should convert championship to upsert payload', () => {
    const result = ChampionshipHelpers.convertChampionshipToUpsertPayload(
      ChampionshipStubs.validChampionships[1]
    )

    expect(result.drivers).toStrictEqual([
      {
        id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
        firstName: 'Carlos',
        lastName: 'Sainz',
        team: '6259bf61c5112dc1e32a1e35',
        isRegistered: false,
        isRemoved: false,
        bonifications: [],
        penalties: [{ penalty: '1', race: '6259bf61c5112dc1e32a1e4a' }]
      },
      {
        id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
        firstName: 'Max',
        lastName: 'Verstappen',
        team: '6259bf61c5112dc1e32a1e36',
        isRegistered: false,
        isRemoved: false,
        bonifications: [],
        penalties: []
      },
      {
        id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
        firstName: 'Sérgio',
        lastName: 'Pérez',
        team: '6259bf61c5112dc1e32a1e36',
        isRegistered: false,
        isRemoved: false,
        bonifications: [],
        penalties: []
      },
      {
        user: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
        team: '62618f71e73e0fc8a51081b9',
        isRegistered: true,
        isRemoved: true,
        bonifications: [
          { bonification: '1', race: '6259bf61c5112dc1e32a1e4a' }
        ],
        penalties: []
      },
      {
        user: 'cgGVaihjpTWtiloYcYLxzzpl95V2',
        team: '62618f71e73e0fc8a51081b9',
        bonifications: [],
        penalties: [],
        isRegistered: true,
        isRemoved: false
      }
    ])
    expect(result.pendentDrivers).toStrictEqual([
      {
        team: '62618f71e73e0fc8a51081b9',
        user: 'cgGVaihjpTWtiloYcYLxzzpl95V2'
      }
    ])
    expect(result.races).toStrictEqual([
      {
        id: '6259bf61c5112dc1e32a1e45',
        track: '624ef8a7a48d056271814be9',
        startDate: '2022-04-15T18:52:12.912Z'
      },
      {
        id: '6259bf61c5112dc1e32a1e4a',
        track: '624ef8a7a48d056271814bea',
        startDate: '2022-04-19T18:52:12.000Z'
      },
      {
        id: '6259bf61c5112dc1e32a1e4f',
        track: '624ef8a7a48d056271814beb',
        startDate: '2022-04-28T18:52:12.000Z'
      },
      {
        id: '6259bf61c5112dc1e32a1e54',
        track: '624ef8a7a48d056271814bfc',
        startDate: '2022-05-06T18:52:12.000Z'
      }
    ])
    expect(result.scoringSystem).toStrictEqual({
      '1': 25,
      '2': 20,
      '3': 18,
      '4': 15,
      '5': 10
    })
    expect(result.teams).toStrictEqual([
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
    ])
    expect(result.admins).toStrictEqual([
      { user: 'ohYViVrxyCakFXTrUdlS981v8Pf2', isCreator: true }
    ])
    expect(result.bonifications).toStrictEqual([
      {
        name: 'Volta mais rápida',
        points: 1,
        id: '6259bf61c5112dc1e32a1e41'
      }
    ])
    expect(result.penalties).toStrictEqual([
      {
        name: 'Colisão',
        points: 5,
        id: '6259bf61c5112dc1e32a1e43'
      }
    ])
  })
})
