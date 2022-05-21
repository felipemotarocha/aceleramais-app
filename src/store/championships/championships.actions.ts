import { Dispatch } from '@reduxjs/toolkit'
import api from '~api/axios.api'

// Utilities
import { API_URL } from '~constants/config.constants'
import Championship from '~types/championship.types'
import {
  getChampionshipsFailure,
  getChampionshipsStart,
  getChampionshipsSuccess
} from './championships.slice'

export const getChampionships = (driver: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipsStart())

    try {
      const { data: championships }: { data: Championship[] } = await api.get(
        `${API_URL}/api/championship?driver=${driver}`
      )

      await dispatch(getChampionshipsSuccess(championships))
    } catch (error: any) {
      await dispatch(getChampionshipsFailure(error?.message))
    }
  }
}
