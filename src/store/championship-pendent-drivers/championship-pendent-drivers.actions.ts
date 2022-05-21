import { Dispatch } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Actions
import {
  ChampionshipPendentDriver,
  getChampionshipPendentDriversFailure,
  getChampionshipPendentDriversStart,
  getChampionshipPendentDriversSuccess,
  submitChampionshipPendentDriversEditionFailure,
  submitChampionshipPendentDriversEditionStart,
  submitChampionshipPendentDriversEditionSuccess
} from './championship-pendent-drivers.slice'

// Utilities
import api from '~api/axios.api'
import Championship, { ChampionshipUpsertDto } from '~types/championship.types'
import { API_URL } from '~constants/config.constants'

export const getChampionshipPendentDrivers = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipPendentDriversStart())

    try {
      const { data }: { data: Championship } = await api.get(
        `/api/championship/${championship}?full_populate=true`
      )

      const pendentDrivers: ChampionshipPendentDriver[] =
        data.pendentDrivers.map((driver) => ({
          ...driver,
          status: 'none'
        }))

      await dispatch(getChampionshipPendentDriversSuccess(pendentDrivers))
    } catch (error: any) {
      await dispatch(getChampionshipPendentDriversFailure(error?.message))
    }
  }
}

export const submitChampionshipPendentDriversEdition = (
  championship: string,
  data: ChampionshipUpsertDto
) => {
  return async (dispatch: Dispatch) => {
    dispatch(submitChampionshipPendentDriversEditionStart())

    try {
      // eslint-disable-next-line no-undef
      const formData = new FormData()

      formData.append('data', JSON.stringify(data))

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

      return dispatch(submitChampionshipPendentDriversEditionSuccess())
    } catch (error) {
      dispatch(
        submitChampionshipPendentDriversEditionFailure((error as any).message)
      )

      throw error
    }
  }
}
