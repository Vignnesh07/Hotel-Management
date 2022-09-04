import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishlist: [],
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload
    },
  },
})
  
// Action creators are generated for each case reducer function
export const { setWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer