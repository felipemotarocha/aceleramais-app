import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

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
      const { data: championships }: { data: Championship[] } = await axios.get(
        `${API_URL}/api/championship?driver=${driver}`
      )

      await dispatch(getChampionshipsSuccess(championships))
    } catch (error: any) {
      await dispatch(getChampionshipsFailure(error?.message))
    }
  }
}
