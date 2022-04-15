import { Dispatch } from '@reduxjs/toolkit'

// Utilities
import { API_URL } from '~constants/config.constants'
import Race from '~types/race.types'
import {
  getChampionshipRacesFailure,
  getChampionshipRacesStart,
  getChampionshipRacesSuccess
} from './championship-races.slice'
import api from '~api/axios.api'

export const getChampionshipRaces = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipRacesStart())

    try {
      const { data: championshipRaces }: { data: Race[] } = await api.get(
        `${API_URL}/api/race?championship=${championship}`
      )

      await dispatch(getChampionshipRacesSuccess(championshipRaces))
    } catch (error: any) {
      await dispatch(getChampionshipRacesFailure(error?.message))
    }
  }
}
