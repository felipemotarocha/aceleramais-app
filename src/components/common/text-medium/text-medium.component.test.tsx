import React from 'react'
import { render } from '@testing-library/react-native'
import TextMedium from './text-medium.component'

it('should render Text Medium with correct styles', () => {
  const { getByText } = render(<TextMedium>Lorem Ipsum</TextMedium>)

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({ fontFamily: 'Poppins_500Medium' })
})

it('should render Text Medium with correct styles when passing style prop', () => {
  const { getByText } = render(
    <TextMedium style={{ fontSize: 18 }}>Lorem Ipsum</TextMedium>
  )

  const textElement = getByText('Lorem Ipsum')

  expect(textElement).toHaveStyle({
    fontFamily: 'Poppins_500Medium',
    fontSize: 18
  })
})
