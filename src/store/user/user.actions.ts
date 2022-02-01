import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from '@reduxjs/toolkit'

import { API_URL } from '~constants/config.constants'

import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess
} from './user.slice'
import User from '~types/user.types'

export const loginUser = (id: string, authToken: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginUserStart())

    try {
      const { data } = await axios.get(`${API_URL}/api/user?id=${id}`)

      await AsyncStorage.setItem('authToken', authToken)

      return dispatch(loginUserSuccess(data))
    } catch (error) {
      return dispatch(loginUserFailure(error))
    }
  }
}

export const createUser = (user: User & { profileImageBase64?: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(createUserStart())

    try {
      await axios.post(`${API_URL}/api/user/`, user)

      return dispatch(createUserSuccess())
    } catch (error) {
      return dispatch(createUserFailure(error))
    }
  }
}

export const signOutUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(signOutUserStart())

    try {
      await AsyncStorage.removeItem('authToken')
      return dispatch(signOutUserSuccess())
    } catch (error) {
      return dispatch(signOutUserFailure(error))
    }
  }
}
