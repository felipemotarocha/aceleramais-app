import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Championship from '~types/championship.types'

export type ChampionshipsSliceInitialState = {
  championships: Championship[]
  filterBy?: 'admin' | 'completed'
  error: string | null
  loading: boolean
}

const championshipsInitialState: ChampionshipsSliceInitialState = {
  championships: [],
  filterBy: undefined,
  error: null,
  loading: false
}

const championshipsSlice = createSlice({
  name: 'championships',
  initialState: championshipsInitialState,
  reducers: {
    getChampionshipsStart: (state) => {
      state.championships = []
      state.loading = true
      state.error = null
    },
    getChampionshipsSuccess: (state, action: PayloadAction<Championship[]>) => {
      state.championships = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipsFailure: (state, action: PayloadAction<string>) => {
      state.championships = []
      state.loading = false
      state.error = action.payload
    },
    updateFilterBy: (
      state,
      action: PayloadAction<'admin' | 'completed' | undefined>
    ) => {
      state.filterBy = action.payload
    }
  }
})

export const {
  getChampionshipsStart,
  getChampionshipsSuccess,
  getChampionshipsFailure,
  updateFilterBy
} = championshipsSlice.actions

const championshipsReducer = championshipsSlice.reducer

export default championshipsReducer
