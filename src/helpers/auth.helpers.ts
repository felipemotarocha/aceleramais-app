import api from '~api/axios.api'
import { API_URL } from '~constants/config.constants'
import { showError } from './flash-message.helpers'

export const invalidCredentials = () => {
  return showError('Verifique as credenciais inseridas e tente novamente.')
}

export const emailIsAlreadyInUse = () =>
  showError('Esse e-mail já está sendo utilizado.')

export const passwordDoesNotHaveTheMinLength = () =>
  showError('A senha precisa ter pelo menos 6 caracteres.')

export const tooManyFailedAttemps = () =>
  showError(
    'Essa conta foi bloqueada por muitas tentativas de login sem sucesso. Para recuperá-la, resete a sua senha.'
  )

export const checkIfUserIsRegistered = async (
  userId: string,
  authToken: string
) => {
  try {
    await api.get(`${API_URL}/api/user?id=${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })

    return true
  } catch (_) {
    return false
  }
}
