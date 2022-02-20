import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ChampionshipTeamStandings } from '~types/championship.types'

export type ChampionshipTeamStandingsSliceInitialState = {
  championshipTeamStandings?: ChampionshipTeamStandings
  error: string | null
  loading: boolean
}

const championshipTeamStandingsInitialState: ChampionshipTeamStandingsSliceInitialState =
  {
    championshipTeamStandings: undefined,
    error: null,
    loading: false
  }

const championshipTeamStandingsSlice = createSlice({
  name: 'championshipTeamStandings',
  initialState: championshipTeamStandingsInitialState,
  reducers: {
    getChampionshipTeamStandingsStart: (state) => {
      state.championshipTeamStandings = undefined
      state.loading = true
      state.error = null
    },
    getChampionshipTeamStandingsSuccess: (
      state,
      action: PayloadAction<ChampionshipTeamStandings>
    ) => {
      state.championshipTeamStandings = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipTeamStandingsFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.championshipTeamStandings = undefined
      state.loading = false
      state.error = action.payload
    },
    clear(state) {
      state.championshipTeamStandings = undefined
      state.error = null
      state.loading = false
    }
  }
})

export const {
  getChampionshipTeamStandingsStart,
  getChampionshipTeamStandingsSuccess,
  getChampionshipTeamStandingsFailure,
  clear
} = championshipTeamStandingsSlice.actions

const championshipTeamStandingsReducer = championshipTeamStandingsSlice.reducer

export default championshipTeamStandingsReducer
