import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  basicInfo:
    | {
        title: string
        platform: string
        description?: string
      }
    | undefined
}

const championshipCreationInitialState: InitialState = {
  basicInfo: undefined
}

const championshipSlice = createSlice({
  name: 'championshipCreation',
  initialState: championshipCreationInitialState,
  reducers: {
    updateBasicInfo: (state, action) => {
      state.basicInfo = action.payload
    }
  }
})

export const { updateBasicInfo } = championshipSlice.actions

const championshipCreationReducer = championshipSlice.reducer

export default championshipCreationReducer
