import { Dispatch } from '@reduxjs/toolkit'
import api from '~api/axios.api'

// Utilities
import { API_URL } from '~constants/config.constants'
import Track from '~types/track.types'

// Redux
import {
  getTracksFailure,
  getTracksStart,
  getTracksSuccess
} from './track.slice'

export const getTracks = () => {
  return async (dispatch: Dispatch) => {
    await dispatch(getTracksStart())

    try {
      const { data: tracks }: { data: Track[] } = await api.get(
        `${API_URL}/api/track`
      )

      await dispatch(getTracksSuccess(tracks))
    } catch (error: any) {
      await dispatch(getTracksFailure(error?.message))
    }
  }
}
