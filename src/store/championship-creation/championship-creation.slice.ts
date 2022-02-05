import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  basicInfo:
    | {
        title: string
        platform: string
        description?: string
        image?: {
          uri: string
          type?: string
        }
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
    updateBasicInfo: (
      state,
      action: PayloadAction<{
        title: string
        platform: string
        description?: string
        image?: {
          uri: string
          type?: string
        }
      }>
    ) => {
      state.basicInfo = action.payload
    },
    clear: (state) => {
      state.basicInfo = undefined
    }
  }
})

export const { updateBasicInfo, clear } = championshipSlice.actions

const championshipCreationReducer = championshipSlice.reducer

export default championshipCreationReducer
