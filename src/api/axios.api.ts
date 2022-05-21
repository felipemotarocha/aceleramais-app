import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '~constants/config.constants'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem('authToken')

    if (authToken) {
      config.headers!.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
