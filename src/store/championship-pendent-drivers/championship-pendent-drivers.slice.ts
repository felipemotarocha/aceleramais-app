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
}

const championshipPendentDriversInitialState: ChampionshipPendentDriversSliceInitialState =
  {
    pendentDrivers: [],
    error: null,
    loading: false
  }

const championshipPendentDriversSlice = createSlice({
  name: 'championshipPendentDrivers',
  initialState: championshipPendentDriversInitialState,
  reducers: {
    getChampionshipPendentDriversStart: (state) => {
      state.pendentDrivers = []
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
  clear
} = championshipPendentDriversSlice.actions

const championshipPendentDriversReducer =
  championshipPendentDriversSlice.reducer

export default championshipPendentDriversReducer
