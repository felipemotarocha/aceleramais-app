import * as React from 'react'
import { render, waitFor } from '~helpers/test.helpers'
import ChampionshipStubs from '~stubs/championship.stubs'
import UserStubs from '~stubs/user.stubs'
import ChampionshipDetailsHeaderContainer from './championship-details-header.container'

describe('Championship Details Header', () => {
  it('should render with edit button if current user is the admin', async () => {
    const { getByText, queryByText } = render(
      <ChampionshipDetailsHeaderContainer />,
      {
        preloadedState: {
          user: { currentUser: UserStubs.validUser },
          championshipDetails: {
            championshipDetails: {
              ...ChampionshipStubs.validChampionships[0],
              admins: [{ user: UserStubs.validUser, isCreator: true }]
            }
          }
        }
      }
    )

    getByText(/psgl sim racing league/i)
    getByText(/plataforma:/i)
    getByText(/pc/i)
    getByText(/código:/i)
    getByText(/#12345678/i)
    getByText(/editar/i)
    expect(queryByText(/solicitar entrada/i)).toBeNull()
    expect(queryByText(/entrada solicitada/i)).toBeNull()
  })

  it('should not show edit button if current user is not the admin', async () => {
    const { getByText, queryByText } = render(
      <ChampionshipDetailsHeaderContainer />,
      {
        preloadedState: {
          user: { currentUser: UserStubs.validUser },
          championshipDetails: {
            championshipDetails: {
              ...ChampionshipStubs.validChampionships[0],
              admins: [
                { user: { ...UserStubs.validUser, id: '123' }, isCreator: true }
              ]
            }
          }
        }
      }
    )

    getByText(/psgl sim racing league/i)
    getByText(/plataforma:/i)
    getByText(/pc/i)
    getByText(/código:/i)
    getByText(/#12345678/i)
    expect(queryByText(/editar/i)).toBeNull()
    expect(queryByText(/solicitar entrada/i)).toBeNull()
    expect(queryByText(/entrada solicitada/i)).toBeNull()
  })

  it('should show the entry request button if the user is not the admin and is not in the championship', async () => {
    const { getByText, queryByText } = render(
      <ChampionshipDetailsHeaderContainer />,
      {
        preloadedState: {
          user: { currentUser: { ...UserStubs.validUser, id: '345' } },
          championshipDetails: {
            championshipDetails: {
              ...ChampionshipStubs.validChampionships[0],
              admins: [{ user: UserStubs.validUser, isCreator: true }]
            }
          }
        }
      }
    )

    getByText(/psgl sim racing league/i)
    getByText(/plataforma:/i)
    getByText(/pc/i)
    getByText(/código:/i)
    getByText(/#12345678/i)
    expect(queryByText(/entrada solicitada/i)).toBeNull()
    expect(queryByText(/editar/i)).toBeNull()
    await waitFor(async () => {
      getByText(/solicitar entrada/i)
    })
  })

  it('should show that the entry was already requested if the user is a pendent driver', async () => {
    const { getByText, queryByText } = render(
      <ChampionshipDetailsHeaderContainer />,
      {
        preloadedState: {
          user: { currentUser: { ...UserStubs.validUser, id: '345' } },
          championshipDetails: {
            championshipDetails: {
              ...ChampionshipStubs.validChampionships[0],
              admins: [{ user: UserStubs.validUser, isCreator: true }],
              pendentDrivers: [{ user: { ...UserStubs.validUser, id: '345' } }]
            }
          }
        }
      }
    )

    getByText(/psgl sim racing league/i)
    getByText(/plataforma:/i)
    getByText(/pc/i)
    getByText(/código:/i)
    getByText(/#12345678/i)
    expect(queryByText(/solicitar entrada/i)).toBeNull()
    expect(queryByText(/editar/i)).toBeNull()
    await waitFor(async () => {
      getByText(/entrada solicitada/i)
    })
  })
})
