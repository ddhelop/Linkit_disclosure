import { create } from 'zustand'

interface NotificationStore {
  unReadChatCount: number
  setUnReadChatCount: (count: number) => void
  unReadNotificationCount: number
  setUnReadNotificationCount: (count: number) => void
}

const useNotificationStore = create<NotificationStore>((set) => ({
  unReadChatCount: 0,
  unReadNotificationCount: 0,
  setUnReadChatCount: (count: number) => set({ unReadChatCount: count }),
  setUnReadNotificationCount: (count: number) => set({ unReadNotificationCount: count }),
}))

export default useNotificationStore
