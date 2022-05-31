import React from 'react'
import MockHelpers from '~helpers/mock.helpers'
import { render, waitFor, fireEvent } from '~helpers/test.helpers'
import ChampionshipStubs from '~stubs/championship.stubs'
import UserStubs from '~stubs/user.stubs'
import ChampionshipListContainer from './championship-list.container'

describe('Championship Listing', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  it('should show all championships that the user is participating', async () => {
    axiosMock.onGet().reply(200, ChampionshipStubs.validChampionships)

    const { getByText } = render(<ChampionshipListContainer />, {
      preloadedState: { user: { currentUser: UserStubs.validUser } }
    })

    await waitFor(async () => {
      getByText(/psgl sim racing league/i)
      getByText(/wor sim racing league/i)
      getByText(/wsl sim racing league/i)
    })
  })

  it('should show all championships that the user is an admin', async () => {
    axiosMock.onGet().reply(200, ChampionshipStubs.validChampionships)

    const { getByText, queryByText } = render(<ChampionshipListContainer />, {
      preloadedState: { user: { currentUser: UserStubs.validUser } }
    })

    await fireEvent.press(getByText(/criados por você/i))

    await waitFor(async () => {
      getByText(/psgl sim racing league/i)
      getByText(/wor sim racing league/i)
      expect(queryByText(/wsl sim racing league/i)).toBeNull()
    })
  })

  it('should show all championships that are finished', async () => {
    axiosMock.onGet().reply(200, ChampionshipStubs.validChampionships)

    const { getByText, queryByText } = render(<ChampionshipListContainer />, {
      preloadedState: { user: { currentUser: UserStubs.validUser } }
    })

    await fireEvent.press(getByText(/finalizados/i))

    await waitFor(async () => {
      getByText(/wsl sim racing league/i)
      expect(queryByText(/psgl sim racing league/i)).toBeNull()
      expect(queryByText(/wor sim racing league/i)).toBeNull()
    })
  })
})
