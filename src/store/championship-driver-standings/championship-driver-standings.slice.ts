import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ChampionshipDriverStandings } from '~types/championship.types'

export type ChampionshipDriverStandingsSliceInitialState = {
  championshipDriverStandings?: ChampionshipDriverStandings
  error: string | null
  loading: boolean
}

const championshipDriverStandingsInitialState: ChampionshipDriverStandingsSliceInitialState =
  {
    championshipDriverStandings: undefined,
    error: null,
    loading: false
  }

const championshipDriverStandingsSlice = createSlice({
  name: 'championshipDriverStandings',
  initialState: championshipDriverStandingsInitialState,
  reducers: {
    getChampionshipDriverStandingsStart: (state) => {
      state.championshipDriverStandings = undefined
      state.loading = true
      state.error = null
    },
    getChampionshipDriverStandingsSuccess: (
      state,
      action: PayloadAction<ChampionshipDriverStandings>
    ) => {
      state.championshipDriverStandings = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipDriverStandingsFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.championshipDriverStandings = undefined
      state.loading = false
      state.error = action.payload
    },
    clear(state) {
      state.championshipDriverStandings = undefined
      state.error = null
      state.loading = false
    }
  }
})

export const {
  getChampionshipDriverStandingsStart,
  getChampionshipDriverStandingsSuccess,
  getChampionshipDriverStandingsFailure,
  clear
} = championshipDriverStandingsSlice.actions

const championshipDriverStandingsReducer =
  championshipDriverStandingsSlice.reducer

export default championshipDriverStandingsReducer
