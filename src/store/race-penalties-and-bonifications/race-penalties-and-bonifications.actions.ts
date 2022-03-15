import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_URL } from '~constants/config.constants'
import Championship from '~types/championship.types'

import {
  getChampionshipDriversFailure,
  getChampionshipDriversStart,
  getChampionshipDriversSuccess
} from './race-penalties-and-bonifications.slice'

export const getChampionshipDrivers = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipDriversStart())

    try {
      const { data }: { data: Championship } = await axios.get(
        `${API_URL}/api/championship/${championship}`
      )

      await dispatch(getChampionshipDriversSuccess(data.drivers))
    } catch (error: any) {
      await dispatch(getChampionshipDriversFailure(error?.message))
    }
  }
}
