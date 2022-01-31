import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { API_URL } from '~constants/config.constants'

import User from '~types/user.types'

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ id, authToken }: { id: string; authToken: string }, _thunkAPI) => {
    const { data } = await axios.get(`${API_URL}/api/user/${id}`)

    console.log({ data })

    await AsyncStorage.setItem('authToken', authToken)

    return data
  }
)

export const createUser = createAsyncThunk(
  'users/create',
  async ({ user, authToken }: { user: User; authToken: string }) => {
    const { data } = await axios.post(`${API_URL}/api/user`, user)

    return data
  }
)

export const signOutUser = createAsyncThunk('users/signOut', async () => {
  console.log('sign out')
  return await AsyncStorage.removeItem('authToken')
})
