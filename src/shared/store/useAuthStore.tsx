import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logoutApi } from '@/features/login/api/authApi'

export function getAccessToken() {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='))
  return tokenCookie ? tokenCookie.split('=')[1].trim() : null
}

interface AuthStore {
  isLogin: boolean
  emailId: string | null
  checkLogin: () => void
  logout: () => void
  setEmailId: (emailId: string) => void
  setLoginState: (isLogin: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      emailId: null,

      setLoginState: (isLogin: boolean) => {
        set({ isLogin })
      },

      checkLogin: () => {
        const token = getAccessToken()
        set({ isLogin: !!token })
      },

      setEmailId: (emailId: string) => {
        set({ emailId })
      },

      logout: async () => {
        await logoutApi()
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        set({ isLogin: false, emailId: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        emailId: state.emailId,
        isLogin: state.isLogin,
      }),
    },
  ),
)
