import React from 'react'

import { act, fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import mockAxios from 'jest-mock-axios'

import SignUpScreen from './sign-up.container'

import store from '~store'

describe('Sign Up Screen', () => {
  afterEach(() => {
    mockAxios.reset()
  })

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

  // it('should sign in the user on success', async () => {
  //   const { getByText, getByLabelText } = makeSut()

  //   const firstNameInput = getByLabelText('Digite seu nome')
  //   const lastNameInput = getByLabelText(/digite seu sobrenome/i)
  //   const emailInput = getByLabelText(/digite seu e-mail/i)
  //   const passwordInput = getByLabelText(/digite sua senha/i)
  //   const userNameInput = getByLabelText(/digite seu nome de usuário/i)

  //   await act(async () => {
  //     fireEvent.changeText(firstNameInput, 'valid_first_name')
  //     fireEvent.changeText(lastNameInput, 'valid_last_name')
  //     fireEvent.changeText(emailInput, 'valid_email@mail.com')
  //     fireEvent.changeText(passwordInput, 'valid_password')
  //     fireEvent.changeText(userNameInput, 'valid_user_name')
  //   })

  //   const user = {
  //     id: 'valid_id',
  //     email: 'valid_email',
  //     firstName: 'valid_first_name',
  //     lastName: 'valid_last_name',
  //     provider: 'valid_provider',
  //     userName: 'valid_user_name'
  //   }

  //   const createAccountElement = getByText(/criar conta/i)

  //   await act(async () => {
  //     jest
  //       .spyOn(axios, 'post')
  //       .mockReturnValueOnce(
  //         new Promise((resolve, _reject) => resolve({ data: user }))
  //       )

  //     jest
  //       .spyOn(axios, 'get')
  //       .mockReturnValueOnce(
  //         new Promise((resolve, _reject) => resolve({ data: user }))
  //       )

  //     await fireEvent.press(createAccountElement)
  //   })

  //   const signOutElement = getByText(/sign out/i)

  //   expect(signOutElement).toBeDefined()
  // })
})
