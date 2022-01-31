import { createSlice } from '@reduxjs/toolkit'

import { createUser, loginUser, signOutUser } from './user.actions'

const userInitialState = {
  currentUser: {
    data: null,
    loading: false,
    error: null
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: {
    [createUser.pending.type]: (state) => {
      state.currentUser = {
        ...state.currentUser,
        error: null,
        loading: true
      }
    },
    [createUser.fulfilled.type]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        error: null,
        loading: false
      }
    },
    [createUser.rejected.type]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        error: action.payload,
        loading: false
      }
    },

    [loginUser.pending.type]: (state) => {
      state.currentUser = {
        ...state.currentUser,
        error: null,
        loading: true
      }
    },
    [loginUser.fulfilled.type]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        data: action.payload,
        error: null,
        loading: false
      }
    },
    [loginUser.rejected.type]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        data: null,
        error: action.payload,
        loading: false
      }
    },

    [signOutUser.pending.type]: (state) => {
      state.currentUser = {
        ...state.currentUser,
        error: null,
        loading: true
      }
    },
    [signOutUser.fulfilled.type]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        data: null,
        error: null,
        loading: false
      }
    },
    [signOutUser.rejected.type]: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        error: action.payload,
        loading: false
      }
    }
  }
})

const userReducer = userSlice.reducer

export default userReducer
