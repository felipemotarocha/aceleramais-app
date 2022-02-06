import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Track from '~types/track.types'

export type _Track = Track & { isSelected: boolean }
export type _Race = {
  id: string
  startDate?: string
  track: Track
  isCompleted: boolean
}
export type _ScoringSystem = { position: number; points: number }[]

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
  scoringSystem: []
}

const championshipCreationInitialState: ChampionshipCreationSliceInitialState =
  {
    basicInfo: undefined,
    tracks: [],
    races: [],
    scoringSystem: []
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
    clear: (state) => {
      state.basicInfo = undefined
    }
  }
})

export const { updateBasicInfo, updateTracks, updateRaces, clear } =
  championshipSlice.actions

const championshipCreationReducer = championshipSlice.reducer

export default championshipCreationReducer
