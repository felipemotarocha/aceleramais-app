import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '~types/user.types'

type InitialState = {
  currentUser: User | null
  error: string | null
  loading: boolean
}

const userInitialState: InitialState = {
  currentUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    loginUserStart: (state) => {
      state.currentUser = null
      state.error = null
      state.loading = true
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.error = null
      state.loading = false
    },
    loginUserFailure: (state, action) => {
      state.currentUser = null
      state.error = action.payload
      state.loading = false
    },

    createUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    createUserSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    createUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    signOutUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    signOutUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    submitUserEditionStart: (state) => {
      state.loading = true
      state.error = null
    },
    submitUserEditionSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    submitUserEditionFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    refreshCurrentUserStart: (state) => {
      state.loading = true
    },
    refreshCurrentUserSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    refreshCurrentUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  submitUserEditionStart,
  submitUserEditionSuccess,
  submitUserEditionFailure,
  refreshCurrentUserStart,
  refreshCurrentUserSuccess,
  refreshCurrentUserFailure
} = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
