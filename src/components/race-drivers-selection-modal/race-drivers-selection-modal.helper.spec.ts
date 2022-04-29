import RaceDriversSelectionModalHelper from './race-drivers-selection-modal.helper'

describe('Race Drivers Selection Modal Helper', () => {
  it('should correctly generate the drivers when a driver is already on the race classification', () => {
    expect(
      RaceDriversSelectionModalHelper.generateInitialAvailableDrivers(
        [
          {
            id: '1',
            firstName: 'valid_first_name',
            lastName: 'valid_last_name',
            isRegistered: false,
            isRemoved: false
          },
          {
            user: {
              id: 'valid_id',
              email: 'valid_email',
              firstName: 'valid_first_name',
              lastName: 'valid_last_name',
              provider: 'google',
              userName: 'valid_user_name'
            },
            isRegistered: true,
            isRemoved: false
          }
        ],
        [
          {
            isRegistered: false,
            id: '1',
            position: 1,
            isRemoved: false,
            scores: true
          }
        ]
      )
    ).toStrictEqual([
      {
        isRegistered: false,
        id: '1',
        position: 1,
        scores: true,
        isRemoved: false
      },
      {
        isRegistered: true,
        isRemoved: false,
        scores: true,
        position: 0,
        user: {
          id: 'valid_id',
          email: 'valid_email',
          firstName: 'valid_first_name',
          lastName: 'valid_last_name',
          provider: 'google',
          userName: 'valid_user_name'
        }
      }
    ])
  })

  it('should correctly generate the drivers when all drivers are in the race classification', () => {
    expect(
      RaceDriversSelectionModalHelper.generateInitialAvailableDrivers(
        [
          {
            id: '1',
            firstName: 'valid_first_name',
            lastName: 'valid_last_name',
            isRegistered: false,
            isRemoved: false
          },
          {
            user: {
              id: 'valid_id',
              email: 'valid_email',
              firstName: 'valid_first_name',
              lastName: 'valid_last_name',
              provider: 'google',
              userName: 'valid_user_name'
            },
            isRegistered: true,
            isRemoved: false
          }
        ],
        [
          {
            isRegistered: false,
            id: '1',
            position: 1,
            scores: true,
            isRemoved: false
          },
          {
            user: {
              id: 'valid_id',
              email: 'valid_email',
              firstName: 'valid_first_name',
              lastName: 'valid_last_name',
              provider: 'google',
              userName: 'valid_user_name'
            },
            position: 2,
            isRegistered: true,
            scores: false,
            isRemoved: false
          }
        ]
      )
    ).toStrictEqual([
      {
        isRegistered: false,
        id: '1',
        position: 1,
        scores: true,
        isRemoved: false
      },
      {
        isRegistered: true,
        position: 2,
        user: {
          id: 'valid_id',
          email: 'valid_email',
          firstName: 'valid_first_name',
          lastName: 'valid_last_name',
          provider: 'google',
          userName: 'valid_user_name'
        },
        scores: false,
        isRemoved: false
      }
    ])
  })
})
