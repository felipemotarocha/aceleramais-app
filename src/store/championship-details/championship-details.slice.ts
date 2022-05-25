import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Championship from '~types/championship.types'

export type ChampionshipDetailsSliceInitialState = {
  championshipDetails?: Championship
  error: string | null
  loading: boolean
}

const championshipDetailsInitialState: ChampionshipDetailsSliceInitialState = {
  championshipDetails: undefined,
  error: null,
  loading: false
}

const championshipDetailsSlice = createSlice({
  name: 'championshipDetails',
  initialState: championshipDetailsInitialState,
  reducers: {
    getChampionshipDetailsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getChampionshipDetailsSuccess: (
      state,
      action: PayloadAction<Championship>
    ) => {
      state.championshipDetails = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipDetailsFailure: (state, action: PayloadAction<string>) => {
      state.championshipDetails = undefined
      state.loading = false
      state.error = action.payload
    },
    requestChampionshipEntryStart: (state) => {
      state.loading = true
    },
    requestChampionshipEntrySuccess: (state) => {
      state.loading = true
      state.error = null
    },
    requestChampionshipEntryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getChampionshipDetailsStart,
  getChampionshipDetailsSuccess,
  getChampionshipDetailsFailure,
  requestChampionshipEntryStart,
  requestChampionshipEntrySuccess,
  requestChampionshipEntryFailure
} = championshipDetailsSlice.actions

const championshipDetailsReducer = championshipDetailsSlice.reducer

export default championshipDetailsReducer
