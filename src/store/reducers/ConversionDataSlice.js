import { createSlice } from '@reduxjs/toolkit'

export const ConversionDataSlice = createSlice({
  name: 'conversionData',
  initialState: {
    value: {},
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update } = ConversionDataSlice.actions

export default ConversionDataSlice.reducer