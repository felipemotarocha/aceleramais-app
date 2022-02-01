import React from 'react'

import { act, fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import mockAxios from 'jest-mock-axios'

import SignInScreen from './sign-in.container'

import store from '~store'

describe('Sign In Screen', () => {
  const mockSignUp = jest.fn(() => {
    return Promise.resolve({
      user: {
        uid: 'fakeuid'
      }
    })
  })
  const mockSignIn = jest.fn(() =>
    Promise.resolve({
      user: {
        uid: 'fakeUid'
      }
    })
  )

  const mockGetAuth = jest.fn()

  jest.mock('firebase/auth', () => {
    return {
      getAuth: () => mockGetAuth,
      signInWithEmailAndPassword: () => mockSignIn,
      createUserWithEmailAndPassword: () => mockSignUp
    }
  })

  jest.mock('axios', () => {
    return {
      get: () => jest.fn(() => Promise.resolve({ id: 'valid_id' }))
    }
  })

  afterEach(() => {
    mockAxios.reset()
  })

  const makeSut = () =>
    render(
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider
            initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
            <SignInScreen />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    )

  it('should show errors if trying to submit without filling all fields', async () => {
    const { getByText } = makeSut()

    const signInElement = getByText(/entrar/i)

    await act(async () => {
      fireEvent.press(signInElement)
    })

    expect(getByText(/e-mail é obrigatório./i)).toBeDefined()
    expect(getByText(/senha é obrigatória./i)).toBeDefined()
  })

  //   it('should login', async () => {
  //     const { getByLabelText, getByText } = makeSut()

  //     const emailInput = getByLabelText(/digite seu e-mail/i)
  //     const passwordInput = getByLabelText(/digite sua senha/i)

  //     await act(async () => {
  //       fireEvent.changeText(emailInput, 'valid_email@mail.com')
  //       fireEvent.changeText(passwordInput, 'valid_password')
  //     })

  //     const signInElement = getByText(/entrar/i)

  //     await waitForElementToBeRemoved(() => signInElement)

  //     await act(async () => {
  //       fireEvent.press(signInElement)
  //     })
  //   })
})
