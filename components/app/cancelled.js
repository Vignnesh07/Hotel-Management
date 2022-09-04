import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cancelled: [],
}

export const cancelledSlice = createSlice({
  name: 'cancelled',
  initialState,
  reducers: {
    setCancelledBookings: (state, action) => {
      state.cancelled = action.payload
    },
  },
})
  
// Action creators are generated for each case reducer function
export const { setCancelledBookings } = cancelledSlice.actions

export default cancelledSlice.reducer