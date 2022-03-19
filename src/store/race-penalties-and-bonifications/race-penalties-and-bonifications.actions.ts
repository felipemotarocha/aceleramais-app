import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_URL } from '~constants/config.constants'
import Championship, { Bonification, Penalty } from '~types/championship.types'
import Race from '~types/race.types'

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
  getRaceSuccess
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

export const getBonifications = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getBonificationsStart())

    try {
      const { data: bonifications }: { data: Bonification[] } = await axios.get(
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
      const { data: penalties }: { data: Penalty[] } = await axios.get(
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
    await dispatch(getChampionshipDriversStart())

    try {
      const { data }: { data: Race } = await axios.get(
        `${API_URL}/api/race/${race}`
      )

      await dispatch(getRaceSuccess(data))
    } catch (error: any) {
      await dispatch(getRaceFailure(error?.message))
    }
  }
}
