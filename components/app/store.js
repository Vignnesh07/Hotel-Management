import { configureStore } from '@reduxjs/toolkit'
import bookingsReducer  from './bookings'

export const Store = configureStore({
    reducer: {
        bookings: bookingsReducer,
    },
});