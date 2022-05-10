import ChampionshipStubs from '~stubs/championship.stubs'
import ChampionshipEntryRequestModalHelpers from './championship-entry-request-modal.helpers'

describe('Championship Entry Request Modal Helper', () => {
  it('should generate correct payload when the entry request does not contain a team', () => {
    const result = ChampionshipEntryRequestModalHelpers.generateSubmitPayload({
      championship: {
        ...ChampionshipStubs.validChampionships[0],
        scoringSystem: {
          championship: '6259bf61c5112dc1e32a1e34',
          scoringSystem: {
            '1': 25,
            '2': 20,
            '3': 18,
            '4': 15,
            '5': 10
          },
          id: '6259bf61c5112dc1e32a1e3f'
        }
      },
      driver: {
        id: 'valid_id',
        email: 'valid_email@mail.com',
        firstName: 'valid_first_name',
        lastName: 'valid_last_name',
        provider: 'google',
        userName: 'valid_username'
      }
    })

    console.log({ result })

    expect(result.pendentDrivers).toStrictEqual([
      {
        user: 'valid_id',
        team: undefined
      }
    ])
  })

  it('should generate correct payload when the entry request contains a team', () => {
    const result = ChampionshipEntryRequestModalHelpers.generateSubmitPayload({
      championship: {
        ...ChampionshipStubs.validChampionships[0],
        scoringSystem: {
          championship: '6259bf61c5112dc1e32a1e34',
          scoringSystem: {
            '1': 25,
            '2': 20,
            '3': 18,
            '4': 15,
            '5': 10
          },
          id: '6259bf61c5112dc1e32a1e3f'
        }
      },
      driver: {
        id: 'valid_id',
        email: 'valid_email@mail.com',
        firstName: 'valid_first_name',
        lastName: 'valid_last_name',
        provider: 'google',
        userName: 'valid_username'
      },
      team: 'valid_team'
    })

    console.log({ result })

    expect(result.pendentDrivers).toStrictEqual([
      {
        user: 'valid_id',
        team: 'valid_team'
      }
    ])
  })
})
