import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Reducers
import userReducer from './user/user.slice'
import championshipCreationReducer from './championship-creation/championship-creation.slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    championshipCreation: championshipCreationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
