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

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`
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
        const response = await logoutApi()
        if (response.isSuccess) {
          deleteCookie('accessToken')
          set({ isLogin: false, emailId: null })
          window.location.href = '/'
        }
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
