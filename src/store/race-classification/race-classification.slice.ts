import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RaceClassification } from '~types/race.types'

export type RaceClassificationEditionSliceInitialState = {
  raceClassification?: RaceClassification
  error: string | null
  loading: boolean
}

const raceClassificationInitialState: RaceClassificationEditionSliceInitialState =
  {
    raceClassification: undefined,
    error: null,
    loading: false
  }

const raceClassificationSlice = createSlice({
  name: 'raceClassification',
  initialState: raceClassificationInitialState,
  reducers: {
    getRaceClassificationStart: (state) => {
      state.raceClassification = undefined
      state.loading = true
      state.error = null
    },
    getRaceClassificationSuccess: (
      state,
      action: PayloadAction<RaceClassification>
    ) => {
      state.raceClassification = action.payload
      state.loading = false
      state.error = null
    },
    getRaceClassificationFailure: (state, action: PayloadAction<string>) => {
      state.raceClassification = undefined
      state.loading = false
      state.error = action.payload
    },

    submitRaceClassificationEditStart: (state) => {
      state.loading = true
      state.error = null
    },
    submitRaceClassificationEditSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    submitRaceClassificationEditFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false
      state.error = action.payload
    },
    updateRaceClassification: (
      state,
      action: PayloadAction<RaceClassification>
    ) => {
      state.raceClassification = action.payload
    },
    clear(state) {
      state.raceClassification = undefined
      state.error = null
      state.loading = false
    }
  }
})

export const {
  getRaceClassificationStart,
  getRaceClassificationSuccess,
  getRaceClassificationFailure,
  submitRaceClassificationEditStart,
  submitRaceClassificationEditSuccess,
  submitRaceClassificationEditFailure,
  updateRaceClassification,
  clear
} = raceClassificationSlice.actions

const raceClassificationReducer = raceClassificationSlice.reducer

export default raceClassificationReducer
