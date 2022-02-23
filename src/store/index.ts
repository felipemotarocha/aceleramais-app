import { configureStore } from '@reduxjs/toolkit'
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

const store = configureStore({
  reducer: {
    user: userReducer,
    championshipCreation: championshipCreationReducer,
    championships: championshipsReducer,
    championshipDetails: championshipDetailsReducer,
    championshipRaces: championshipRacesReducer,
    championshipDriverStandings: championshipDriverStandingsReducer,
    championshipTeamStandings: championshipTeamStandingsReducer,
    raceClassificationReducer: raceClassificationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
