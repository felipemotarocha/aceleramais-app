import { Dispatch } from '@reduxjs/toolkit'

import { API_URL } from '~constants/config.constants'
import { RaceClassification } from '~types/race.types'
import {
  getChampionshipAdminsFailure,
  getChampionshipAdminsStart,
  getChampionshipAdminsSuccess,
  getRaceClassificationFailure,
  getRaceClassificationStart,
  getRaceClassificationSuccess,
  submitRaceClassificationEditFailure,
  submitRaceClassificationEditStart,
  submitRaceClassificationEditSuccess
} from './race-classification.slice'
import api from '~api/axios.api'
import Championship from '~types/championship.types'

export const getRaceClassification = (race: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getRaceClassificationStart())

    try {
      const { data: raceClassification }: { data: RaceClassification } =
        await api.get(`${API_URL}/api/raceClassification?race=${race}`)

      await dispatch(getRaceClassificationSuccess(raceClassification))
    } catch (error: any) {
      await dispatch(getRaceClassificationFailure(error?.message))
    }
  }
}

export const getChampionshipAdmins = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipAdminsStart())

    try {
      const { data }: { data: Championship } = await api.get(
        `${API_URL}/api/championship/${championship}`
      )

      const admins = data.admins.map((item) => item.user.id)

      await dispatch(getChampionshipAdminsSuccess(admins))
    } catch (error: any) {
      await dispatch(getChampionshipAdminsFailure(error?.message))
    }
  }
}

export const submitRaceClassificationEdit = (
  raceClassification: RaceClassification
) => {
  return async (dispatch: Dispatch) => {
    await dispatch(submitRaceClassificationEditStart())

    try {
      const payload = raceClassification.classification.map((item) => ({
        ...item,
        user: item?.user?.id
      }))

      await api.patch(
        `${API_URL}/api/raceClassification?id=${raceClassification.id}&race=${raceClassification.race.id}`,
        { classification: payload }
      )

      dispatch(submitRaceClassificationEditSuccess())
    } catch (error: any) {
      dispatch(submitRaceClassificationEditFailure(error?.message))
      throw error(error?.message)
    }
  }
}
