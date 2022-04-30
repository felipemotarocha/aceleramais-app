import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import User from '~types/user.types'
import Championship from '~types/championship.types'

export type SearchEntity = 'championship' | 'user'

type SearchInitialState = {
  entity: SearchEntity
  result: Championship[] | User[]
  loading: boolean
  error?: string
}

const searchInitialState: SearchInitialState = {
  entity: 'championship',
  result: [],
  loading: false,
  error: undefined
}

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    submitSearchStart: (state) => {
      state.result = []
      state.loading = true
      state.error = undefined
    },
    submitSearchSuccess: (
      state,
      action: PayloadAction<Championship[] | User[]>
    ) => {
      state.result = action.payload
      state.loading = false
      state.error = undefined
    },
    submitSearchFailure: (state, action: PayloadAction<string>) => {
      state.result = []
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { submitSearchStart, submitSearchSuccess, submitSearchFailure } =
  searchSlice.actions

const searchReducer = searchSlice.reducer

export default searchReducer
