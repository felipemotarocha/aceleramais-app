import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Track from '~types/track.types'

type _Track = Track & { isSelected: boolean }

type InitialState = {
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
  races: {
    id: string
    startDate?: string
    track: Track
    isCompleted: boolean
  }[]
}

const championshipCreationInitialState: InitialState = {
  basicInfo: undefined,
  tracks: [],
  races: []
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
    clear: (state) => {
      state.basicInfo = undefined
    }
  }
})

export const { updateBasicInfo, updateTracks, updateRaces, clear } =
  championshipSlice.actions

const championshipCreationReducer = championshipSlice.reducer

export default championshipCreationReducer
