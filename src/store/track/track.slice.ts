import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Track from '~types/track.types'

type InitialState = {
  tracks: Track[]
  loading: boolean
  error: string | undefined
}

const trackInitialState: InitialState = {
  tracks: [],
  loading: false,
  error: undefined
}

const trackSlice = createSlice({
  name: 'track',
  initialState: trackInitialState,
  reducers: {
    getTracksStart: (state) => {
      state.loading = true
    },
    getTracksSuccess: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload
      state.loading = false
    },
    getTracksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { getTracksStart, getTracksSuccess, getTracksFailure } =
  trackSlice.actions

const trackReducer = trackSlice.reducer

export default trackReducer
