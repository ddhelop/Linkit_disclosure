import { create } from 'zustand'

interface NotificationStore {
  unreadChatCount: number
  unreadNotificationCount: number
  incrementUnreadChat: () => void
  incrementUnreadNotification: () => void
  setUnreadChatCount: (count: number) => void
  setUnreadNotificationCount: (count: number) => void
  resetUnreadCounts: () => void
}

// 알림 카운트 관리
const useNotificationStore = create<NotificationStore>((set) => ({
  unreadChatCount: 0,
  unreadNotificationCount: 0,

  // 채팅 알림 카운트 증가
  incrementUnreadChat: () =>
    set((state) => ({
      unreadChatCount: state.unreadChatCount + 1,
    })),

  // 알림 카운트 증가
  incrementUnreadNotification: () =>
    set((state) => ({
      unreadNotificationCount: state.unreadNotificationCount + 1,
    })),

  setUnreadChatCount: (count: number) => set({ unreadChatCount: count }),
  setUnreadNotificationCount: (count: number) => set({ unreadNotificationCount: count }),

  resetUnreadCounts: () =>
    set({
      unreadChatCount: 0,
      unreadNotificationCount: 0,
    }),
}))

const useNotificationListStore = create<any>((set) => ({
  notifications: [],
  setNotifications: (notifications: any[]) => set({ notifications }),
}))

export default useNotificationStore
