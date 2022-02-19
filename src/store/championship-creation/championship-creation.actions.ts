import { Dispatch } from '@reduxjs/toolkit'
import FormData from 'form-data'

import { API_URL } from '~constants/config.constants'

import {
  ChampionshipCreationSliceInitialState,
  createChampionshipFailure,
  createChampionshipStart,
  createChampionshipSuccess
} from './championship-creation.slice'

export const createChampionship = (
  data: Omit<ChampionshipCreationSliceInitialState, 'error' | 'loading'> & {
    admins: { user: string; isCreator: boolean }[]
  }
) => {
  return async (dispatch: Dispatch) => {
    dispatch(createChampionshipStart())

    try {
      const { basicInfo, penalties, bonifications, admins } = data

      const races = data.races.map((item) => ({
        ...item,
        track: item.track.id
      }))

      const drivers = data.drivers.map((item) =>
        item.isRegistered
          ? { user: item.id, isRegistered: true }
          : {
              firstName: item.firstName,
              lastName: item.lastName,
              isRegistered: false
            }
      )

      const teams = data.teams.map((item) => ({
        color: item.color,
        name: item.name
      }))

      let scoringSystem = {}

      for (const item of data.scoringSystem) {
        scoringSystem = { ...scoringSystem, [item.position]: item.points }
      }

      const payload = {
        name: basicInfo?.title,
        description: basicInfo?.description,
        platform: basicInfo?.platform,
        races,
        teams,
        drivers,
        scoringSystem,
        penalties,
        bonifications,
        admins
      }

      console.log(JSON.stringify(payload))

      const formData = new FormData()

      formData.append('data', JSON.stringify(payload))

      if (basicInfo?.image) {
        formData.append('avatarImage', {
          uri: basicInfo.image.uri,
          name: `championship_image`,
          type: 'image/jpeg'
        })
      }

      // eslint-disable-next-line no-undef
      const response = await fetch(`${API_URL}/api/championship`, {
        body: formData as any,
        method: 'POST'
      })

      return dispatch(createChampionshipSuccess(response))
    } catch (error) {
      return dispatch(createChampionshipFailure(error as any))
    }
  }
}
