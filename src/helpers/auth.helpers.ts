import { showError } from './flash-message.helpers'

export const invalidCredentials = () => {
  return showError('Verifique as credenciais inseridas e tente novamente.')
}

export const emailIsAlreadyInUse = () =>
  showError('Esse e-mail já está sendo utilizado.')

export const passwordDoesNotHaveTheMinLength = () =>
  showError('A senha precisa ter pelo menos 6 caracteres.')
