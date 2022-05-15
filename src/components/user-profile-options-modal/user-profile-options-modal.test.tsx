import * as React from 'react'

import { render, fireEvent, waitFor } from '~helpers/test.helpers'
import UserProfileOptionsModalContainer from './user-profile-options-modal.container'

describe('User Profile Options Modal', () => {
  it('should render initial component', () => {
    const { getByText } = render(
      <UserProfileOptionsModalContainer isVisible setIsVisible={() => {}} />
    )

    getByText(/opções/i)
    getByText(/editar perfil/i)
    getByText(/fazer logout/i)
  })

  it('should redirect to edit profile screen on edit profile press', async () => {
    const { getByText } = render(
      <UserProfileOptionsModalContainer isVisible setIsVisible={() => {}} />
    )

    await fireEvent.press(getByText(/editar perfil/i))

    await waitFor(async () => {
      getByText(/editar perfil/i)
    })
  })
})
