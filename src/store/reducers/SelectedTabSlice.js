import { createSlice } from '@reduxjs/toolkit'

export const SelectedTabSlice = createSlice({
  name: 'selectedTab',
  initialState: {
    value: 0,
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update } = SelectedTabSlice.actions

export default SelectedTabSlice.reducer