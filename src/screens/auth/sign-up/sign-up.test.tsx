import * as React from 'react'

import mockAxios from 'jest-mock-axios'
import { render, fireEvent, waitFor } from '~helpers/test.helpers'
import SignUpContainer from './sign-up.container'
import { SignUpScreenDefaultValues } from '~navigators/auth/auth-stack.navigator.types'

type Params = {
  isEdit: boolean
  defaultValues?: SignUpScreenDefaultValues
}

const mockParams: Params = {
  isEdit: false,
  defaultValues: undefined
}

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        isEdit: mockParams.isEdit,
        defaultValues: mockParams?.defaultValues
      }
    })
  }
})

describe('Sign Up Screen', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it('should show errors if trying to submit without filling all fields', async () => {
    const { getByText } = render(<SignUpContainer />)

    const createAccountElement = getByText(/criar conta/i)

    await fireEvent.press(createAccountElement)

    expect(getByText(/seu nome é obrigatório./i)).toBeDefined()
    expect(getByText(/seu sobrenome é obrigatório./i)).toBeDefined()
    expect(getByText(/e-mail é obrigatório./i)).toBeDefined()
    expect(getByText(/senha é obrigatória./i)).toBeDefined()
    expect(getByText(/nome de usuário é obrigatório./i)).toBeDefined()
  })

  it('should show save button and edit profile header if is edit', () => {
    mockParams.isEdit = true

    const { getByText } = render(<SignUpContainer />)

    getByText(/salvar/i)
    getByText(/editar perfil/i)
  })

  it('should populate inputs with default values if they are provided', async () => {
    mockParams.isEdit = true
    mockParams.defaultValues = {
      id: 'valid_id',
      email: 'valid_email@mail.com',
      firstName: 'valid_first_name',
      lastName: 'valid_last_name',
      userName: 'valid_user_name'
    }

    const { getByText, getByDisplayValue } = render(<SignUpContainer />)

    await waitFor(async () => {
      getByText(/salvar/i)
      getByDisplayValue(/valid_email@mail.com/i)
      getByDisplayValue(/valid_first_name/i)
      getByDisplayValue(/valid_last_name/i)
      getByDisplayValue(/valid_user_name/i)
    })
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
