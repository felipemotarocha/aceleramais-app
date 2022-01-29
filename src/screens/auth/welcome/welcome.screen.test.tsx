import React from 'react'
import { render } from '@testing-library/react-native'

import WelcomeScreen from './welcome.screen'

it('examples of some things', async () => {
  const { getByText } = render(<WelcomeScreen />)

  const textElement = getByText('Welcome Screen')

  expect(textElement).toBeDefined()
})
