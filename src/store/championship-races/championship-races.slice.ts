import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Race from '~types/race.types'

export type ChampionshipRacesSliceInitialState = {
  championshipRaces: Race[]
  error: string | null
  loading: boolean
}

const championshipRacesInitialState: ChampionshipRacesSliceInitialState = {
  championshipRaces: [],
  error: null,
  loading: false
}

const championshipRacesSlice = createSlice({
  name: 'championshipRaces',
  initialState: championshipRacesInitialState,
  reducers: {
    getChampionshipRacesStart: (state) => {
      state.championshipRaces = []
      state.loading = true
      state.error = null
    },
    getChampionshipRacesSuccess: (state, action: PayloadAction<Race[]>) => {
      state.championshipRaces = action.payload
      state.loading = false
      state.error = null
    },
    getChampionshipRacesFailure: (state, action: PayloadAction<string>) => {
      state.championshipRaces = []
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getChampionshipRacesStart,
  getChampionshipRacesSuccess,
  getChampionshipRacesFailure
} = championshipRacesSlice.actions

const championshipRacesReducer = championshipRacesSlice.reducer

export default championshipRacesReducer
