import React from 'react'
import { render } from '@testing-library/react-native'

import CustomButton from './custom-button.component'

import Colors from '~constants/colors.constants'

describe('Custom Button', () => {
  it('should render primary button with correct styles', () => {
    const { getByText, getByLabelText } = render(
      <CustomButton variant="primary">Lorem Ipsum</CustomButton>
    )

    const buttonElement = getByText('Lorem Ipsum')

    expect(buttonElement).toBeDefined()
    expect(buttonElement).toHaveStyle({
      fontSize: 12
    })

    const pressableElement = getByLabelText('Press the button')

    expect(pressableElement).toHaveStyle({
      backgroundColor: Colors.primary,
      color: Colors.text,
      borderRadius: 50
    })
  })

  it('should render outlined button with correct styles', () => {
    const { getByText, getByLabelText } = render(
      <CustomButton variant="outlined">Lorem Ipsum</CustomButton>
    )

    const buttonElement = getByText('Lorem Ipsum')

    expect(buttonElement).toBeDefined()
    expect(buttonElement).toHaveStyle({
      fontSize: 12
    })

    const pressableElement = getByLabelText('Press the button')

    expect(pressableElement).toHaveStyle({
      backgroundColor: 'transparent',
      color: Colors.text,
      borderRadius: 50
    })
  })
})
