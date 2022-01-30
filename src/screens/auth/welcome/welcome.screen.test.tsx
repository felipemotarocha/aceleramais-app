import React from 'react'
import { render } from '@testing-library/react-native'

import WelcomeScreen from './welcome.screen'

import Colors from '~constants/colors.constants'

it('should show the welcome text and the login buttons', async () => {
  const { getByText } = render(<WelcomeScreen />)

  const textElement = getByText(
    /campeonatos do automobilismo virtual na palma da sua mão. de graça./i
  )

  expect(textElement).toBeDefined()
  expect(textElement).toHaveStyle({
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: Colors.text
  })

  const signUpFree = getByText(/cadastre-se gratuitamente/i)
  expect(signUpFree).toBeDefined()

  const signInWithEmail = getByText(/entrar com e-mail e senha/i)
  expect(signInWithEmail).toBeDefined()

  const signInWithGoogle = getByText(/continuar com o google/i)
  expect(signInWithGoogle).toBeDefined()

  const signInWithApple = getByText(/continuar com a apple/i)
  expect(signInWithApple).toBeDefined()
})
