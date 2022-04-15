import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Track from '~types/track.types'

export type _Track = Track & { isSelected: boolean }
export type _Race = {
  id: string
  startDate?: string
  track: Track
  isCompleted: boolean
}
export type _ScoringSystem = { position: number; points: number }
export type _Team = { id: string; name: string; color: string }
export type _Driver = {
  id: string
  firstName?: string
  lastName?: string
  userName?: string
  team?: _Team
  isRegistered: boolean
  profileImageUrl?: string
}
export type _Bonification = {
  id: string
  name: string
  points: number
}
export type _Penalty = {
  id: string
  name: string
  points: number
}

export type ChampionshipCreationSliceInitialState = {
  basicInfo:
    | {
        title: string
        platform: string
        description?: string
        image?: {
          uri: string
          type?: string
        }
      }
    | undefined
  tracks: _Track[]
  races: _Race[]
  scoringSystem: _ScoringSystem[]
  teams: _Team[]
  drivers: _Driver[]
  bonifications: _Bonification[]
  penalties: _Penalty[]
  loading: boolean
  error?: string
}

const championshipCreationInitialState: ChampionshipCreationSliceInitialState =
  {
    basicInfo: undefined,
    tracks: [],
    races: [],
    scoringSystem: [],
    teams: [],
    drivers: [],
    bonifications: [],
    penalties: [],
    loading: false,
    error: undefined
  }

const championshipSlice = createSlice({
  name: 'championshipCreation',
  initialState: championshipCreationInitialState,
  reducers: {
    updateBasicInfo: (
      state,
      action: PayloadAction<{
        title: string
        platform: string
        description?: string
        image?: {
          uri: string
          type?: string
        }
      }>
    ) => {
      state.basicInfo = action.payload
    },
    updateTracks: (state, action: PayloadAction<_Track[]>) => {
      state.tracks = action.payload
    },
    updateRaces: (
      state,
      action: PayloadAction<
        { id: string; startDate?: string; track: Track; isCompleted: boolean }[]
      >
    ) => {
      state.races = action.payload
    },
    updateScoringSystem: (state, action: PayloadAction<_ScoringSystem[]>) => {
      state.scoringSystem = action.payload
    },
    updateTeams: (state, action: PayloadAction<_Team[]>) => {
      state.teams = action.payload
    },
    updateDrivers: (state, action: PayloadAction<_Driver[]>) => {
      state.drivers = action.payload
    },
    updateBonifications: (state, action: PayloadAction<_Bonification[]>) => {
      state.bonifications = action.payload
    },
    updatePenalties: (state, action: PayloadAction<_Penalty[]>) => {
      state.penalties = action.payload
    },
    createChampionshipStart: (state) => {
      state.loading = true
      state.error = undefined
    },
    createChampionshipSuccess: (state) => {
      state.loading = false
      state.error = undefined
    },
    createChampionshipFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clear: (state) => {
      state.basicInfo = undefined
      state.tracks = []
      state.races = []
      state.scoringSystem = []
      state.teams = []
      state.drivers = []
      state.bonifications = []
      state.penalties = []
      state.bonifications = []
      state.loading = false
      state.error = undefined
    }
  }
})

export const {
  updateBasicInfo,
  updateTracks,
  updateRaces,
  updateScoringSystem,
  updateTeams,
  updateDrivers,
  updateBonifications,
  updatePenalties,
  createChampionshipStart,
  createChampionshipSuccess,
  createChampionshipFailure,
  clear
} = championshipSlice.actions

const championshipCreationReducer = championshipSlice.reducer

export default championshipCreationReducer
