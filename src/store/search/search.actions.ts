import { Dispatch } from '@reduxjs/toolkit'
import api from '~api/axios.api'

// Utilities
import Championship from '~types/championship.types'
import User from '~types/user.types'

// Redux
import {
  SearchEntity,
  submitSearchFailure,
  submitSearchStart,
  submitSearchSuccess
} from './search.slice'

export const submitSearch = (searchText: string, entity: SearchEntity) => {
  return async (dispatch: Dispatch) => {
    await dispatch(submitSearchStart())

    try {
      let data: Championship[] | User[] = []

      if (entity === 'championship') {
        data = await (
          await api.get(`/api/championship?nameOrCode=${searchText}`)
        )?.data
      }

      // TODO: add use case for user

      await dispatch(submitSearchSuccess(data))
    } catch (error: any) {
      await dispatch(submitSearchFailure(error?.message))
    }
  }
}
