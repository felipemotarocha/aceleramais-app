import api from '~api/axios.api'
import { API_URL } from '~constants/config.constants'

const UserHelpers = {
  checkIfUserNameAlreadyExists: async (userName: string) => {
    try {
      await api.get(`${API_URL}/api/user?userName=${userName}`)

      return false
    } catch (_) {
      return true
    }
  }
}

export default UserHelpers
