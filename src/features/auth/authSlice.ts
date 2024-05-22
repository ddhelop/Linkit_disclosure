import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  email?: string | null
  memberBasicInform?: Record<string, any> | null
}

const initialState: AuthState = {
  accessToken: null,
  email: null,
  memberBasicInform: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSimpleAuthData: (state, action: PayloadAction<{ accessToken: string }>) => {
      console.log('Setting simple auth data:', action.payload) // 디버깅용 로그 추가
      state.accessToken = action.payload.accessToken
      localStorage.setItem('accessToken', action.payload.accessToken) // localStorage에 저장
    },
    setFullAuthData: (state, action: PayloadAction<AuthState>) => {
      console.log('Setting full auth data:', action.payload) // 디버깅용 로그 추가
      state.accessToken = action.payload.accessToken
      state.email = action.payload.email
      state.memberBasicInform = action.payload.memberBasicInform
      localStorage.setItem('accessToken', action.payload.accessToken ?? '')
      localStorage.setItem('email', action.payload.email ?? '')
      localStorage.setItem('memberBasicInform', JSON.stringify(action.payload.memberBasicInform ?? {}))
    },
    clearAuthData: (state) => {
      console.log('Clearing auth data') // 디버깅용 로그 추가
      state.accessToken = null
      state.email = null
      state.memberBasicInform = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('email')
      localStorage.removeItem('memberBasicInform')
    },
    initializeAuth: (state) => {
      const accessToken = localStorage.getItem('accessToken')
      const email = localStorage.getItem('email')
      const memberBasicInform = JSON.parse(localStorage.getItem('memberBasicInform') ?? '{}')
      state.accessToken = accessToken
      state.email = email
      state.memberBasicInform = memberBasicInform
    },
  },
})

export const { setSimpleAuthData, setFullAuthData, clearAuthData, initializeAuth } = authSlice.actions
export default authSlice.reducer
