import { Dispatch } from '@reduxjs/toolkit'

// Utilities
import api from '~api/axios.api'
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
    console.log('HERE')
    try {
      const {
        data: championshipTeamStandings
      }: { data: ChampionshipTeamStandings } = await api.get(
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
