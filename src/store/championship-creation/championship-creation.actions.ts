import { Dispatch } from '@reduxjs/toolkit'
import FormData from 'form-data'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { API_URL } from '~constants/config.constants'
import ChampionshipHelpers from '~helpers/championship.helpers'
import { ChampionshipUpsertDto } from '~types/championship.types'

import {
  ChampionshipCreationSliceInitialState,
  createChampionshipFailure,
  createChampionshipStart,
  createChampionshipSuccess,
  editChampionshipFailure,
  editChampionshipStart,
  editChampionshipSuccess
} from './championship-creation.slice'

export const createChampionship = (
  data: Omit<
    ChampionshipCreationSliceInitialState,
    'isEdit' | 'error' | 'loading'
  > & {
    admins: { user: string; isCreator: boolean }[]
  }
) => {
  return async (dispatch: Dispatch) => {
    dispatch(createChampionshipStart())

    try {
      const { basicInfo } = data

      const payload =
        ChampionshipHelpers.convertReducerDataToUpsertPayload(data)

      const formData = new FormData()

      formData.append('data', JSON.stringify(payload))

      if (basicInfo?.image) {
        formData.append('avatarImage', {
          uri: basicInfo.image.uri,
          name: `championship_image`,
          type: 'image/jpeg'
        })
      }

      const authToken = await AsyncStorage.getItem('authToken')

      // eslint-disable-next-line no-undef
      const response = await fetch(`${API_URL}/api/championship`, {
        body: formData as any,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        throw new Error()
      }

      return dispatch(createChampionshipSuccess())
    } catch (error) {
      dispatch(createChampionshipFailure((error as any).message))

      throw error
    }
  }
}

export const editChampionship = (
  championship: string,
  data: ChampionshipUpsertDto
) => {
  return async (dispatch: Dispatch) => {
    dispatch(editChampionshipStart())

    try {
      const formData = new FormData()

      formData.append('data', JSON.stringify(data))

      if (data.avatarImage) {
        formData.append('avatarImage', {
          uri: data.avatarImage.uri,
          name: `championship_image`,
          type: 'image/jpeg'
        })
      }

      const authToken = await AsyncStorage.getItem('authToken')

      // eslint-disable-next-line no-undef
      const response = await fetch(
        `${API_URL}/api/championship/${championship}`,
        {
          body: formData as any,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )

      if (!response.ok) {
        throw new Error()
      }

      return dispatch(editChampionshipSuccess())
    } catch (error) {
      dispatch(editChampionshipFailure((error as any)?.message))

      throw error
    }
  }
}
