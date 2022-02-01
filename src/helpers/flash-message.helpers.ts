import { showMessage } from 'react-native-flash-message'

export const showSuccess = (message: string) =>
  showMessage({
    type: 'success',
    message
  })

export const showError = (message: string) =>
  showMessage({
    type: 'danger',
    message
  })
