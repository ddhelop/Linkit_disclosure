import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import onBoardingReduce from '../features/counter/onBoardingSlice'
import teamOnBoardingReducer from '../features/counter/TeamOnBoardingSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer, // counterSlice.reducer,
    auth: authReducer,
    onBoarding: onBoardingReduce,
    teamOnboarding: teamOnBoardingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
