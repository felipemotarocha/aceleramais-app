import { showMessage } from 'react-native-flash-message'
import Colors from '~constants/colors.constants'

export const showSuccess = (message: string) =>
  showMessage({
    type: 'success',
    message,
    backgroundColor: Colors.primary,
    color: Colors.text
  })

export const showError = (message: string) =>
  showMessage({
    type: 'danger',
    message
  })
