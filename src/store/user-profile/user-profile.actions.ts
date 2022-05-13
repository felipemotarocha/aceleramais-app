import { Dispatch } from '@reduxjs/toolkit'
import api from '~api/axios.api'

// Utilities
import User from '~types/user.types'

// Redux
import {
  getUserProfileFailure,
  getUserProfileStart,
  getUserProfileSuccess
} from './user-profile.slice'

export const getUserProfile = (userName: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(getUserProfileStart())

    try {
      const data: User = await (
        await api.get(`/api/user?userName=${userName}`)
      )?.data

      await dispatch(getUserProfileSuccess(data))
    } catch (error: any) {
      await dispatch(getUserProfileFailure(error?.message))
    }
  }
}
