import React from 'react'
import { act, fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'

import SignUpScreen from './sign-up.container'

import store from '~store'

describe('Sign Up Screen', () => {
  const makeSut = () =>
    render(
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider
            initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
            <SignUpScreen />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )

  it('should show errors if trying to submit without filling all fields', async () => {
    const { getByText } = makeSut()

    const createAccountElement = getByText(/criar conta/i)

    await act(async () => {
      fireEvent.press(createAccountElement)
    })

    expect(getByText(/seu nome é obrigatório./i)).toBeDefined()
    expect(getByText(/seu sobrenome é obrigatório./i)).toBeDefined()
    expect(getByText(/e-mail é obrigatório./i)).toBeDefined()
    expect(getByText(/senha é obrigatória./i)).toBeDefined()
    expect(getByText(/nome de usuário é obrigatório./i)).toBeDefined()
  })
})
