import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'

// Utilities
import { API_URL } from '~constants/config.constants'
import {
  getChampionshipTeamStandingsFailure,
  getChampionshipTeamStandingsStart,
  getChampionshipTeamStandingsSuccess
} from './championship-team-standings.slice'
import { ChampionshipTeamStandings } from '~types/championship.types'

export const getChampionshipTeamStandings = (championship: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getChampionshipTeamStandingsStart())

    try {
      const {
        data: championshipTeamStandings
      }: { data: ChampionshipTeamStandings } = await axios.get(
        `${API_URL}/api/teamStandings?championship=${championship}`
      )

      await dispatch(
        getChampionshipTeamStandingsSuccess(championshipTeamStandings)
      )
    } catch (error: any) {
      await dispatch(getChampionshipTeamStandingsFailure(error?.message))
    }
  }
}
