import React from 'react'
import { render } from '@testing-library/react-native'

import TextSemiBold from './text-semi-bold.component'

import Colors from '~constants/colors.constants'

it('should render Text Semi Bold with correct styles', () => {
  const { getByText } = render(<TextSemiBold>Lorem Ipsum</TextSemiBold>)

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.text
  })
})

it('should render Text Semi Bold with correct styles when passing style prop', () => {
  const { getByText } = render(
    <TextSemiBold style={{ fontSize: 18 }}>Lorem Ipsum</TextSemiBold>
  )

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: Colors.text
  })
})
