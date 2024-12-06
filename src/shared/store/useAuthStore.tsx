import { create } from 'zustand'
import { logoutApi } from '@/features/login/api/authApi'

interface userInfoProps {
  isLogin: boolean // 로그인 여부
  checkLogin: () => void // 로그인 여부 확인 함수
  logout: () => void // 로그아웃
}

export const useUserStore = create<userInfoProps>((set) => {
  return {
    user: null,
    isLogin: false,

    checkLogin: () => {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        set({ isLogin: true })
      } else {
        set({ isLogin: false })
      }
    },

    logout: async () => {
      await logoutApi() // 로그아웃 API 호출
      localStorage.removeItem('accessToken')
      set({ isLogin: false })
    },
  }
})
