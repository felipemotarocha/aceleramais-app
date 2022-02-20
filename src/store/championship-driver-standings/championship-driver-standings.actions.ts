import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'

// Utilities
import { API_URL } from '~constants/config.constants'
import {
  getChampionshipDriverStandingsFailure,
  getChampionshipDriverStandingsStart,
  getChampionshipDriverStandingsSuccess
} from './championship-driver-standings.slice'
import { ChampionshipDriverStandings } from '~types/championship.types'

export const getChampionshipDriverStandings = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipDriverStandingsStart())

    try {
      const {
        data: championshipDriverStandings
      }: { data: ChampionshipDriverStandings } = await axios.get(
        `${API_URL}/api/driverStandings?championship=${championship}`
      )

      await dispatch(
        getChampionshipDriverStandingsSuccess(championshipDriverStandings)
      )
    } catch (error: any) {
      await dispatch(getChampionshipDriverStandingsFailure(error?.message))
    }
  }
}
