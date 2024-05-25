import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import onBoardingReduce from '../features/counter/onBoaringSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer, // counterSlice.reducer,
    auth: authReducer,
    onBoarding: onBoardingReduce,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
