import { createSlice } from '@reduxjs/toolkit'

import { createUser } from './user.actions'

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
        data: null,
        error: null,
        loading: true
      }
    },
    [createUser.fulfilled.type]: (state, action) => {
      state.currentUser = {
        data: action.payload,
        error: null,
        loading: false
      }
    },
    [createUser.rejected.type]: (state, action) => {
      state.currentUser = {
        data: null,
        error: action.payload,
        loading: false
      }
    }
  }
})

const userReducer = userSlice.reducer

export default userReducer
