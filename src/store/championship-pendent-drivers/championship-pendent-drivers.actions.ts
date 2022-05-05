import { Dispatch } from '@reduxjs/toolkit'

// Actions
import {
  getChampionshipPendentDriversFailure,
  getChampionshipPendentDriversStart,
  getChampionshipPendentDriversSuccess
} from './championship-pendent-drivers.slice'

// Utilities
import api from '~api/axios.api'
import Championship from '~types/championship.types'

export const getChampionshipPendentDrivers = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipPendentDriversStart())

    try {
      const { data }: { data: Championship } = await api.get(
        `/api/championship=${championship}?full_populate=true`
      )

      await dispatch(getChampionshipPendentDriversSuccess(data.pendentDrivers))
    } catch (error: any) {
      await dispatch(getChampionshipPendentDriversFailure(error?.message))
    }
  }
}
