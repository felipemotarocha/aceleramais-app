import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Bonification,
  ChampionshipDriver,
  Penalty
} from '~types/championship.types'
import Race from '~types/race.types'

export type RacePenaltiesAndBonificationsEditionSliceInitialState = {
  championshipDrivers: ChampionshipDriver[]
  bonifications: Bonification[]
  penalties: Penalty[]
  selectedDriver?: ChampionshipDriver
  selectedBonification?: Bonification
  selectedPenalty?: Penalty
  race: Race | undefined
  error: string | null
  loading: boolean
}

const racePenaltiesAndBonificationsInitialState: RacePenaltiesAndBonificationsEditionSliceInitialState =
  {
    championshipDrivers: [],
    bonifications: [],
    penalties: [],
    selectedDriver: undefined,
    selectedBonification: undefined,
    selectedPenalty: undefined,
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
    getBonificationsStart: (state) => {
      state.bonifications = []
      state.loading = true
      state.error = null
    },
    getBonificationsSuccess: (state, action: PayloadAction<Bonification[]>) => {
      state.bonifications = action.payload
      state.loading = false
      state.error = null
    },
    getBonificationsFailure: (state, action: PayloadAction<string>) => {
      state.bonifications = []
      state.loading = false
      state.error = action.payload
    },
    getPenaltiesStart: (state) => {
      state.penalties = []
      state.loading = true
      state.error = null
    },
    getPenaltiesSuccess: (state, action: PayloadAction<Penalty[]>) => {
      state.penalties = action.payload
      state.loading = false
      state.error = null
    },
    getPenaltiesFailure: (state, action: PayloadAction<string>) => {
      state.penalties = []
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
    updateSelectedBonification: (
      state,
      action: PayloadAction<Bonification | undefined>
    ) => {
      state.selectedBonification = action.payload
      state.loading = false
      state.error = null
    },
    updateSelectedPenalty: (
      state,
      action: PayloadAction<Penalty | undefined>
    ) => {
      state.selectedPenalty = action.payload
      state.loading = false
      state.error = null
    },
    clear(state) {
      state.selectedDriver = undefined
      state.bonifications = []
      state.penalties = []
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
  getBonificationsStart,
  getBonificationsSuccess,
  getBonificationsFailure,
  getPenaltiesStart,
  getPenaltiesSuccess,
  getPenaltiesFailure,
  submitRacePenaltiesAndBonificationsEditStart,
  submitRacePenaltiesAndBonificationsEditSuccess,
  submitRacePenaltiesAndBonificationsEditFailure,
  updateSelectedDriver,
  updateSelectedBonification,
  updateSelectedPenalty,
  clear
} = racePenaltiesAndBonificationsSlice.actions

const racePenaltiesAndBonificationsReducer =
  racePenaltiesAndBonificationsSlice.reducer

export default racePenaltiesAndBonificationsReducer
