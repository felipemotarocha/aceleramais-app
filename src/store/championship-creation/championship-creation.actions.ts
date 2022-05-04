import { Dispatch } from '@reduxjs/toolkit'
import FormData from 'form-data'

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

      const payload = ChampionshipHelpers.generateUpsertPayload(data)

      const formData = new FormData()

      formData.append('data', JSON.stringify(payload))

      if (basicInfo?.image) {
        formData.append('avatarImage', {
          uri: basicInfo.image.uri,
          name: `championship_image`,
          type: 'image/jpeg'
        })
      }

      // eslint-disable-next-line no-undef
      await fetch(`${API_URL}/api/championship`, {
        body: formData as any,
        method: 'POST'
      })

      return dispatch(createChampionshipSuccess())
    } catch (error) {
      return dispatch(createChampionshipFailure(error as any))
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

      // eslint-disable-next-line no-undef
      await fetch(`${API_URL}/api/championship/${championship}`, {
        body: formData as any,
        method: 'PUT'
      })

      return dispatch(editChampionshipSuccess())
    } catch (error) {
      return dispatch(editChampionshipFailure(error as any))
    }
  }
}
