import React from 'react'
import MockHelpers from '~helpers/mock.helpers'
import { render, waitFor, fireEvent } from '~helpers/test.helpers'
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

      // getByText(/ver campeonatos/i)
    })
  })

  it('should open options modal on options press', async () => {
    axiosMock.onGet().reply(200, UserStubs.validUser)

    const { getByText, getByA11yLabel } = render(<UserProfileContainer />, {
      preloadedState: { user: { currentUser: UserStubs.validUser } }
    })

    await waitFor(async () => {
      getByA11yLabel(/opções/i)
    })

    await fireEvent.press(getByA11yLabel(/opções/i))

    await waitFor(async () => {
      getByText(/editar perfil/i)
      getByText(/fazer logout/i)
    })
  })

  it('should not show options button if the user profile is not the logged user', async () => {
    axiosMock.onGet().reply(200, UserStubs.validUser)

    const { queryByA11yLabel } = render(<UserProfileContainer />, {
      preloadedState: {
        user: { currentUser: { ...UserStubs.validUser, id: '1' } }
      }
    })

    expect(queryByA11yLabel(/opções/i)).toBeNull()
  })

  it('should not show biography section if the user does not have one', () => {
    axiosMock.onGet().reply(200, { ...UserStubs.validUser, biography: '' })

    const { queryByText } = render(<UserProfileContainer />)

    expect(queryByText(/sobre/i)).toBeNull()
  })
})
