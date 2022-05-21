import { Dispatch } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FormData from 'form-data'

import { API_URL } from '~constants/config.constants'
import Championship, { Bonification, Penalty } from '~types/championship.types'
import Race from '~types/race.types'
import api from '~api/axios.api'

import {
  getBonificationsFailure,
  getBonificationsStart,
  getBonificationsSuccess,
  getChampionshipDriversFailure,
  getChampionshipDriversStart,
  getChampionshipDriversSuccess,
  getPenaltiesFailure,
  getPenaltiesStart,
  getPenaltiesSuccess,
  getRaceFailure,
  getRaceStart,
  getRaceSuccess,
  submitRacePenaltiesAndBonificationsEditFailure,
  submitRacePenaltiesAndBonificationsEditStart
} from './race-penalties-and-bonifications.slice'

export const getChampionshipDrivers = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipDriversStart())

    try {
      const { data }: { data: Championship } = await api.get(
        `${API_URL}/api/championship/${championship}`
      )

      await dispatch(getChampionshipDriversSuccess(data.drivers))
    } catch (error: any) {
      await dispatch(getChampionshipDriversFailure(error?.message))
    }
  }
}

export const getBonifications = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getBonificationsStart())

    try {
      const { data: bonifications }: { data: Bonification[] } = await api.get(
        `${API_URL}/api/bonification?championship=${championship}`
      )

      await dispatch(getBonificationsSuccess(bonifications))
    } catch (error: any) {
      await dispatch(getBonificationsFailure(error?.message))
    }
  }
}

export const getPenalties = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getPenaltiesStart())

    try {
      const { data: penalties }: { data: Penalty[] } = await api.get(
        `${API_URL}/api/penalty?championship=${championship}`
      )

      await dispatch(getPenaltiesSuccess(penalties))
    } catch (error: any) {
      await dispatch(getPenaltiesFailure(error?.message))
    }
  }
}

export const getRace = (race: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getRaceStart())

    try {
      const { data }: { data: Race } = await api.get(
        `${API_URL}/api/race/${race}`
      )

      await dispatch(getRaceSuccess(data))
    } catch (error: any) {
      await dispatch(getRaceFailure(error?.message))
    }
  }
}

export const submitRacePenaltiesAndBonificationsEdit = (
  championship: string,
  data: any
) => {
  return async (dispatch: Dispatch) => {
    dispatch(submitRacePenaltiesAndBonificationsEditStart())

    try {
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
    } catch (error: any) {
      dispatch(submitRacePenaltiesAndBonificationsEditFailure(error?.message))

      throw error
    }
  }
}
