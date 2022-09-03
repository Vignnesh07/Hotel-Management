import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookings: [],
}

export const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload
    },
  },
})
  
// Action creators are generated for each case reducer function
export const { setBookings } = bookingSlice.actions

export default bookingSlice.reducer