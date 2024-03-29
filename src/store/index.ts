import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Reducers
import userReducer from './user/user.slice'
import championshipCreationReducer from './championship-creation/championship-creation.slice'
import championshipsReducer from './championships/championships.slice'
import championshipDetailsReducer from './championship-details/championship-details.slice'
import championshipRacesReducer from './championship-races/championship-races.slice'
import championshipDriverStandingsReducer from './championship-driver-standings/championship-driver-standings.slice'
import championshipTeamStandingsReducer from './championship-team-standings/championship-team-standings.slice'
import raceClassificationReducer from './race-classification/race-classification.slice'
import racePenaltiesAndBonificationsReducer from './race-penalties-and-bonifications/race-penalties-and-bonifications.slice'
import searchReducer from './search/search.slice'
import championshipPendentDriversReducer from './championship-pendent-drivers/championship-pendent-drivers.slice'
import userProfileReducer from './user-profile/user-profile.slice'

const combinedReducer = combineReducers({
  user: userReducer,
  championshipCreation: championshipCreationReducer,
  championships: championshipsReducer,
  championshipDetails: championshipDetailsReducer,
  championshipRaces: championshipRacesReducer,
  championshipDriverStandings: championshipDriverStandingsReducer,
  championshipTeamStandings: championshipTeamStandingsReducer,
  raceClassification: raceClassificationReducer,
  racePenaltiesAndBonifications: racePenaltiesAndBonificationsReducer,
  championshipPendentDrivers: championshipPendentDriversReducer,
  search: searchReducer,
  userProfile: userProfileReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'user/signOutUserSuccess') {
    state = undefined
  }

  return combinedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
