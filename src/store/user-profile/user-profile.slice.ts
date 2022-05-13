import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import User from '~types/user.types'

type UserProfileInitialState = {
  userProfile?: User
  loading: boolean
  error?: string
}

const userProfileInitialState: UserProfileInitialState = {
  userProfile: undefined,
  loading: false,
  error: undefined
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: userProfileInitialState,
  reducers: {
    getUserProfileStart: (state) => {
      state.loading = true
      state.error = undefined
    },
    getUserProfileSuccess: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload
      state.loading = false
      state.error = undefined
    },
    getUserProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    clear: (state) => {
      state.userProfile = undefined
      state.loading = false
      state.error = undefined
    }
  }
})

export const {
  getUserProfileStart,
  getUserProfileSuccess,
  getUserProfileFailure,
  clear
} = userProfileSlice.actions

const userProfileReducer = userProfileSlice.reducer

export default userProfileReducer
