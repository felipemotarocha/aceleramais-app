import { createAsyncThunk } from '@reduxjs/toolkit'

import User from '~types/user.types'

export const createUser = createAsyncThunk(
  'users/create',
  async (user: User) => {}
)
