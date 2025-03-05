import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Platform = 'naver' | 'kakao' | 'google'

interface RecentLoginStore {
  platform: Platform | null
  setPlatform: (platform: Platform) => void
}

export const useRecentLoginStore = create<RecentLoginStore>()(
  persist(
    (set) => ({
      platform: null,

      setPlatform: (platform: Platform) => {
        set({ platform })
      },
    }),
    {
      name: 'recent-login-storage',
      partialize: (state) => ({
        platform: state.platform,
      }),
    },
  ),
)
