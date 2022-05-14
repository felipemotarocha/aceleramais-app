import * as React from 'react'

import { render } from '~helpers/test.helpers'
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
})
