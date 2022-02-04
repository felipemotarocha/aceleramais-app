import axios from 'axios'
import { API_URL } from '~constants/config.constants'

const UserHelpers = {
  checkIfUserNameAlreadyExists: async (userName: string) => {
    try {
      await axios.get(`${API_URL}/api/user?userName=${userName}`)

      return false
    } catch (_) {
      return true
    }
  }
}

export default UserHelpers
