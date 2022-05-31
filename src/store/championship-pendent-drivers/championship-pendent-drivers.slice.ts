import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ChampionshipPendentDriver as _ChampionshipPendentDriver } from '~types/championship.types'

export type PendentDriverStatus = 'approved' | 'reproved' | 'none'

export type ChampionshipPendentDriver = _ChampionshipPendentDriver & {
  status: PendentDriverStatus
}

export type ChampionshipPendentDriversSliceInitialState = {
  pendentDrivers: ChampionshipPendentDriver[]
  error: string | null
  loading: boolean
  submitIsLoading: boolean
}

const championshipPendentDriversInitialState: ChampionshipPendentDriversSliceInitialState =
  {
    pendentDrivers: [],
    error: null,
    loading: false,
    submitIsLoading: false
  }

const championshipPendentDriversSlice = createSlice({
  name: 'championshipPendentDrivers',
  initialState: championshipPendentDriversInitialState,
  reducers: {
    getChampionshipPendentDriversStart: (state) => {
      state.loading = true
      state.error = null
    },
    getChampionshipPendentDriversSuccess: (
      state,
      action: PayloadAction<ChampionshipPendentDriver[]>
    ) => {
      state.pendentDrivers = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipPendentDriversFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.pendentDrivers = []
      state.loading = false
      state.error = action.payload
    },
    submitChampionshipPendentDriversEditionStart: (state) => {
      state.submitIsLoading = true
      state.error = null
    },
    submitChampionshipPendentDriversEditionSuccess: (state) => {
      state.submitIsLoading = false
      state.error = null
    },
    submitChampionshipPendentDriversEditionFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.submitIsLoading = false
      state.error = action.payload
    },
    updateChampionshipPendentDrivers: (
      state,
      action: PayloadAction<ChampionshipPendentDriver[]>
    ) => {
      state.pendentDrivers = action.payload
    },
    clear(state) {
      state.pendentDrivers = []
      state.error = null
      state.loading = false
    }
  }
})

export const {
  getChampionshipPendentDriversStart,
  getChampionshipPendentDriversSuccess,
  getChampionshipPendentDriversFailure,
  submitChampionshipPendentDriversEditionStart,
  submitChampionshipPendentDriversEditionSuccess,
  submitChampionshipPendentDriversEditionFailure,
  updateChampionshipPendentDrivers,
  clear
} = championshipPendentDriversSlice.actions

const championshipPendentDriversReducer =
  championshipPendentDriversSlice.reducer

export default championshipPendentDriversReducer
