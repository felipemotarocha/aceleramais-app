import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Bonification, Penalty } from '~types/championship.types'

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
  bonifications?: {
    bonification: Bonification
    race: string
  }[]
  penalties?: {
    penalty: Penalty
    race: string
  }[]
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
  isEdit: boolean
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
    isEdit: false,
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
    editChampionshipStart: (state) => {
      state.loading = true
      state.error = undefined
    },
    editChampionshipSuccess: (state) => {
      state.loading = false
      state.error = undefined
    },
    editChampionshipFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    replace: (
      state,
      action: PayloadAction<ChampionshipCreationSliceInitialState>
    ) => {
      Object.entries(action.payload).forEach(([k, v]) => {
        state[k] = v
      })
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
      state.isEdit = false
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
  editChampionshipStart,
  editChampionshipSuccess,
  editChampionshipFailure,
  replace,
  clear
} = championshipSlice.actions

const championshipCreationReducer = championshipSlice.reducer

export default championshipCreationReducer
