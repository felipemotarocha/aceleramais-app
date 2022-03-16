import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChampionshipDriver } from '~types/championship.types'
import Race from '~types/race.types'

export type RacePenaltiesAndBonificationsEditionSliceInitialState = {
  championshipDrivers: ChampionshipDriver[]
  selectedDriver?: ChampionshipDriver
  race: Race | undefined
  error: string | null
  loading: boolean
}

const racePenaltiesAndBonificationsInitialState: RacePenaltiesAndBonificationsEditionSliceInitialState =
  {
    championshipDrivers: [],
    selectedDriver: undefined,
    race: undefined,
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
    getRaceStart: (state) => {
      state.race = undefined
      state.loading = true
      state.error = null
    },
    getRaceSuccess: (state, action: PayloadAction<Race>) => {
      state.race = action.payload
      state.loading = false
      state.error = null
    },
    getRaceFailure: (state, action: PayloadAction<string>) => {
      state.race = undefined
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
    updateSelectedDriver: (
      state,
      action: PayloadAction<ChampionshipDriver | undefined>
    ) => {
      state.selectedDriver = action.payload
      state.loading = false
      state.error = null
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
  getRaceStart,
  getRaceSuccess,
  getRaceFailure,
  submitRacePenaltiesAndBonificationsEditStart,
  submitRacePenaltiesAndBonificationsEditSuccess,
  submitRacePenaltiesAndBonificationsEditFailure,
  updateSelectedDriver,
  clear
} = racePenaltiesAndBonificationsSlice.actions

const racePenaltiesAndBonificationsReducer =
  racePenaltiesAndBonificationsSlice.reducer

export default racePenaltiesAndBonificationsReducer
