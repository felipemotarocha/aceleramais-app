import { Dispatch } from '@reduxjs/toolkit'

import { API_URL } from '~constants/config.constants'
import { RaceClassification } from '~types/race.types'
import {
  getRaceClassificationFailure,
  getRaceClassificationStart,
  getRaceClassificationSuccess,
  submitRaceClassificationEditFailure,
  submitRaceClassificationEditStart,
  submitRaceClassificationEditSuccess
} from './race-classification.slice'
import api from '~api/axios.api'

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

export const submitRaceClassificationEdit = (
  raceClassification: RaceClassification
) => {
  return async (dispatch: Dispatch) => {
    await dispatch(submitRaceClassificationEditStart())

    try {
      const payload = raceClassification.classification.map((item) => ({
        position: item.position,
        user: item?.user?.id,
        id: item?.id,
        firstName: item?.firstName,
        lastName: item?.lastName,
        isRegistered: item?.isRegistered,
        isRemoved: item?.isRemoved,
        team: item?.team?.id
      }))

      await api.patch(
        `${API_URL}/api/raceClassification?id=${raceClassification.id}&race=${raceClassification.race.id}`,
        { classification: payload }
      )

      dispatch(submitRaceClassificationEditSuccess())
    } catch (error: any) {
      dispatch(submitRaceClassificationEditFailure(error?.message))
    }
  }
}
