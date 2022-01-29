import React from 'react'
import { render } from '@testing-library/react-native'

import TextBold from './text-bold.component'
import Colors from '~constants/colors.constants'

it('should render Text Bold with correct styles', () => {
  const { getByText } = render(<TextBold>Lorem Ipsum</TextBold>)

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({
    fontFamily: 'Poppins_700Bold',
    color: Colors.text
  })
})

it('should render Text Bold with correct styles when passing style prop', () => {
  const { getByText } = render(
    <TextBold style={{ fontSize: 18 }}>Lorem Ipsum</TextBold>
  )

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: Colors.text
  })
})
