import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Platform = 'naver' | 'kakao' | 'google'

interface LastLoggedInStore {
  platform: Platform | null
  setPlatform: (platform: Platform) => void
}

export const useLastLoggedInStore = create<LastLoggedInStore>()(
  persist(
    (set) => ({
      platform: null,

      setPlatform: (platform: Platform) => {
        set({ platform })
      },
    }),
    {
      name: 'last-logged-in-storage',
      partialize: (state) => ({
        platform: state.platform,
      }),
    },
  ),
)
