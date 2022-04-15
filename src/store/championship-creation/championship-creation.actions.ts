import { Dispatch } from '@reduxjs/toolkit'
import FormData from 'form-data'

import { API_URL } from '~constants/config.constants'
import ChampionshipHelpers from '~helpers/championship.helpers'

import {
  ChampionshipCreationSliceInitialState,
  createChampionshipFailure,
  createChampionshipStart,
  createChampionshipSuccess
} from './championship-creation.slice'

export const createChampionship = (
  data: Omit<ChampionshipCreationSliceInitialState, 'error' | 'loading'> & {
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
