import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from '@reduxjs/toolkit'
import FormData from 'form-data'

import { API_URL } from '~constants/config.constants'

import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
  refreshCurrentUserFailure,
  refreshCurrentUserStart,
  refreshCurrentUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  submitUserEditionFailure,
  submitUserEditionStart,
  submitUserEditionSuccess
} from './user.slice'
import User from '~types/user.types'
import { EditUserDto } from '~dtos/user.dtos'
import { showError } from '~helpers/flash-message.helpers'
import api from '~api/axios.api'

export const loginUser = (id: string, authToken: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginUserStart())

    try {
      await AsyncStorage.setItem('authToken', authToken)

      const { data } = await api.get(`/api/user?id=${id}`)

      await AsyncStorage.setItem('userId', id)

      return dispatch(loginUserSuccess(data))
    } catch (error) {
      return dispatch(loginUserFailure(error))
    }
  }
}

export const createUser = (
  user: Omit<User, 'wins' | 'titles' | 'podiums'> & {
    profileImage?: { uri: string; type: string }
    profileImageUrl?: string
    authToken: string
  }
) => {
  return async (dispatch: Dispatch) => {
    dispatch(createUserStart())

    const formData = new FormData()

    formData.append('id', user.id)
    formData.append('firstName', user.firstName)
    formData.append('lastName', user.lastName)
    formData.append('email', user.email)
    formData.append('userName', user.userName)
    formData.append('provider', user.provider)
    formData.append('biography', user.biography)

    if (user.profileImage) {
      formData.append('profileImage', {
        uri: user.profileImage.uri,
        name: `profile_picture_${user.id}`,
        type: 'image/jpeg'
      })
    } else if (user.profileImageUrl) {
      formData.append('profileImageUrl', user.profileImageUrl)
    }

    try {
      // eslint-disable-next-line no-undef
      const response = await fetch(`${API_URL}/api/user`, {
        body: formData as any,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.authToken}`
        }
      })

      if (!response.ok) {
        dispatch(createUserFailure(response.body))
        return showError(
          'Algo deu errado. Por favor, tente novamente mais tarde.'
        )
      }

      return dispatch(createUserSuccess())
    } catch (error: any) {
      return dispatch(createUserFailure(error.message))
    }
  }
}

export const signOutUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(signOutUserStart())

    try {
      await AsyncStorage.removeItem('authToken')
      await AsyncStorage.removeItem('userId')

      return dispatch(signOutUserSuccess())
    } catch (error) {
      return dispatch(signOutUserFailure(error))
    }
  }
}

export const editUser = (params: { user: string; dto: EditUserDto }) => {
  return async (dispatch: Dispatch) => {
    dispatch(submitUserEditionStart())

    try {
      const { user, dto } = params

      const formData = new FormData()

      formData.append('firstName', dto.firstName)
      formData.append('lastName', dto.lastName)
      formData.append('userName', dto.userName)

      if (dto.biography) {
        formData.append('biography', dto.biography)
      }

      if (dto.profileImage) {
        formData.append('profileImage', {
          uri: dto.profileImage.uri,
          name: `profile_picture_${user}`,
          type: 'image/jpeg'
        })
      } else if (dto.profileImageUrl) {
        formData.append('profileImageUrl', dto.profileImageUrl)
      }

      const authToken = await AsyncStorage.getItem('authToken')

      // eslint-disable-next-line no-undef
      const response = await fetch(`${API_URL}/api/user/${user}`, {
        body: formData as any,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        dispatch(submitUserEditionFailure(response.body))
        return showError(
          'Algo deu errado. Por favor, tente novamente mais tarde.'
        )
      }

      dispatch(submitUserEditionSuccess())
    } catch (error) {
      console.log(error)
    }
  }
}

export const refreshCurrentUser = (user: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(refreshCurrentUserStart())

    try {
      const { data } = await api.get(`${API_URL}/api/user?id=${user}`)

      dispatch(refreshCurrentUserSuccess(data))
    } catch (error) {
      dispatch(refreshCurrentUserFailure((error as any).message))
    }
  }
}
