import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Championship from '~types/championship.types'

type InitialState = {
  championships: Championship[]
  error: string | null
  loading: boolean
}

const championshipsInitialState: InitialState = {
  championships: [],
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
    }
  }
})

export const {
  getChampionshipsStart,
  getChampionshipsSuccess,
  getChampionshipsFailure
} = championshipsSlice.actions

const championshipsReducer = championshipsSlice.reducer

export default championshipsReducer
