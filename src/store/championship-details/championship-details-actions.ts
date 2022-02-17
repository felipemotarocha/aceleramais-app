import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

// Utilities
import { API_URL } from '~constants/config.constants'
import Championship from '~types/championship.types'
import {
  getChampionshipDetailsFailure,
  getChampionshipDetailsStart,
  getChampionshipDetailsSuccess
} from './championship-details.slice'

export const getChampionshipDetails = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipDetailsStart())

    try {
      const { data: championshipDetails }: { data: Championship } =
        await axios.get(`${API_URL}/api/championship/${championship}`)

      await dispatch(getChampionshipDetailsSuccess(championshipDetails))
    } catch (error: any) {
      await dispatch(getChampionshipDetailsFailure(error?.message))
    }
  }
}
