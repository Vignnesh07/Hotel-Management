import { configureStore } from '@reduxjs/toolkit'
import bookingsReducer  from './bookings'
import completedReducer from './completed'
import cancelledReducer from './cancelled'
import wishlistReducer from './wishlist'

export const Store = configureStore({
    reducer: {
        bookings: bookingsReducer,
        completed: completedReducer,
        cancelled: cancelledReducer,
        wishlist: wishlistReducer,
    },
});