import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'

// Utilities
import { API_URL } from '~constants/config.constants'
import { RaceClassification } from '~types/race.types'
import {
  getRaceClassificationFailure,
  getRaceClassificationStart,
  getRaceClassificationSuccess
} from './race-classification.slice'

export const getRaceClassification = (race: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getRaceClassificationStart())

    try {
      const { data: raceClassification }: { data: RaceClassification } =
        await axios.get(`${API_URL}/api/raceClassification?race=${race}`)

      await dispatch(getRaceClassificationSuccess(raceClassification))
    } catch (error: any) {
      await dispatch(getRaceClassificationFailure(error?.message))
    }
  }
}
