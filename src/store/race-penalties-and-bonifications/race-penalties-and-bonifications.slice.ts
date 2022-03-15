import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChampionshipDriver } from '~types/championship.types'

export type RacePenaltiesAndBonificationsEditionSliceInitialState = {
  championshipDrivers: ChampionshipDriver[]
  error: string | null
  loading: boolean
}

const racePenaltiesAndBonificationsInitialState: RacePenaltiesAndBonificationsEditionSliceInitialState =
  {
    championshipDrivers: [],
    error: null,
    loading: false
  }

const racePenaltiesAndBonificationsSlice = createSlice({
  name: 'racePenaltiesAndBonifications',
  initialState: racePenaltiesAndBonificationsInitialState,
  reducers: {
    getChampionshipDriversStart: (state) => {
      state.championshipDrivers = []
      state.loading = true
      state.error = null
    },
    getChampionshipDriversSuccess: (
      state,
      action: PayloadAction<ChampionshipDriver[]>
    ) => {
      state.championshipDrivers = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipDriversFailure: (state, action: PayloadAction<string>) => {
      state.championshipDrivers = []
      state.loading = false
      state.error = action.payload
    },
    submitRacePenaltiesAndBonificationsEditStart: (state) => {
      state.loading = true
      state.error = null
    },
    submitRacePenaltiesAndBonificationsEditSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    submitRacePenaltiesAndBonificationsEditFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false
      state.error = action.payload
    },

    clear(state) {
      state.championshipDrivers = []
      state.error = null
      state.loading = false
    }
  }
})

export const {
  getChampionshipDriversStart,
  getChampionshipDriversSuccess,
  getChampionshipDriversFailure,
  submitRacePenaltiesAndBonificationsEditStart,
  submitRacePenaltiesAndBonificationsEditSuccess,
  submitRacePenaltiesAndBonificationsEditFailure,
  clear
} = racePenaltiesAndBonificationsSlice.actions

const racePenaltiesAndBonificationsReducer =
  racePenaltiesAndBonificationsSlice.reducer

export default racePenaltiesAndBonificationsReducer
