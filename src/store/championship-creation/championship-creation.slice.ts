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
export type _Team = { name: string; color: string }

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
}

const championshipCreationInitialState: ChampionshipCreationSliceInitialState =
  {
    basicInfo: undefined,
    tracks: [],
    races: [],
    scoringSystem: [],
    teams: []
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
    clear: (state) => {
      state.basicInfo = undefined
      state.tracks = []
      state.races = []
      state.scoringSystem = []
    }
  }
})

export const {
  updateBasicInfo,
  updateTracks,
  updateRaces,
  updateScoringSystem,
  updateTeams,
  clear
} = championshipSlice.actions

const championshipCreationReducer = championshipSlice.reducer

export default championshipCreationReducer
