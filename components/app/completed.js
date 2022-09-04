import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  completed: [],
}

export const completedSlice = createSlice({
  name: 'completed',
  initialState,
  reducers: {
    setCompletedBookings: (state, action) => {
      state.completed = action.payload
    },
  },
})
  
// Action creators are generated for each case reducer function
export const { setCompletedBookings } = completedSlice.actions

export default completedSlice.reducer