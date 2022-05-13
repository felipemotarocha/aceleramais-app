import React from 'react'
import MockHelpers from '~helpers/mock.helpers'
import { render, waitFor } from '~helpers/test.helpers'
import UserStubs from '~stubs/user.stubs'
import UserProfileContainer from './user-profile.container'

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        userName: 'felipe.rocha'
      }
    })
  }
})

describe('User Profile Screen', () => {
  const axiosMock = MockHelpers.generateAxiosMock()

  it('should render initial screen', async () => {
    axiosMock.onGet().reply(200, UserStubs.validUser)

    const { getByText } = render(<UserProfileContainer />)

    await waitFor(async () => {
      getByText('Felipe')
      getByText('ROCHA')

      getByText('@felipe.rocha')

      getByText(UserStubs.validUser.wins.toString())
      getByText(/vitórias/i)

      getByText(UserStubs.validUser.titles.toString())
      getByText(/títulos/i)

      getByText(UserStubs.validUser.podiums.toString())
      getByText(/pódios/i)

      getByText(/sobre/i)
      getByText(UserStubs.validUser.biography!)

      getByText(/ver campeonatos/i)
    })
  })
})
