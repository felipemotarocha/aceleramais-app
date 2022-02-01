import { showMessage } from 'react-native-flash-message'

export const emailAlreadyInUseError = () =>
  showMessage({
    type: 'danger',
    message: 'Esse e-mail já está sendo utilizado.'
  })

export const passwordMinLengthError = () =>
  showMessage({
    type: 'danger',
    message: 'A senha precisa ter pelo menos 6 caracteres.'
  })
