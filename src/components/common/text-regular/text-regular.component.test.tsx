import React from 'react'
import { render } from '@testing-library/react-native'

import TextRegular from './text-regular.component'

it('should render Text Regular with correct styles', () => {
  const { getByText } = render(<TextRegular>Lorem Ipsum</TextRegular>)

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({ fontFamily: 'Poppins_400Regular' })
})

it('should render Text Regular with correct styles when passing style prop', () => {
  const { getByText } = render(
    <TextRegular style={{ fontSize: 18 }}>Lorem Ipsum</TextRegular>
  )

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({
    fontFamily: 'Poppins_400Regular',
    fontSize: 18
  })
})
