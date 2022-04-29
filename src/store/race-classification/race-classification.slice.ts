import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RaceClassification } from '~types/race.types'

export type RaceClassificationEditionSliceInitialState = {
  raceClassification?: RaceClassification
  error: string | null
  loading: boolean
  championshipAdmins: string[]
}

const raceClassificationInitialState: RaceClassificationEditionSliceInitialState =
  {
    raceClassification: undefined,
    championshipAdmins: [],
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
    getChampionshipAdminsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getChampionshipAdminsSuccess: (state, action: PayloadAction<string[]>) => {
      state.championshipAdmins = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipAdminsFailure: (state, action: PayloadAction<string>) => {
      state.championshipAdmins = []
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
      state.championshipAdmins = []
      state.error = null
      state.loading = false
    }
  }
})

export const {
  getRaceClassificationStart,
  getRaceClassificationSuccess,
  getRaceClassificationFailure,
  getChampionshipAdminsStart,
  getChampionshipAdminsSuccess,
  getChampionshipAdminsFailure,
  submitRaceClassificationEditStart,
  submitRaceClassificationEditSuccess,
  submitRaceClassificationEditFailure,
  updateRaceClassification,
  clear
} = raceClassificationSlice.actions

const raceClassificationReducer = raceClassificationSlice.reducer

export default raceClassificationReducer
