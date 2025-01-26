import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChattingListType, ChatMessage } from '../types/ChatTypes'

interface LastMessage {
  content: string
  timestamp: string
}

interface ChatStore {
  chatList: ChattingListType[]
  updateChatList: (chatList: ChattingListType[]) => void
  lastMessages: Record<number, LastMessage>
  updateLastMessage: (chatRoomId: number, content: string, timestamp: string) => void
  initializeLastMessage: (chatRoomId: number, content: string, timestamp: string) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatList: [],
      lastMessages: {},

      updateChatList: (chatList) => set({ chatList }),

      updateLastMessage: (chatRoomId, content, timestamp) =>
        set((state) => ({
          lastMessages: {
            ...state.lastMessages,
            [chatRoomId]: { content, timestamp },
          },
        })),

      initializeLastMessage: (chatRoomId, content, timestamp) =>
        set((state) => {
          const existingMessage = state.lastMessages[chatRoomId]
          if (existingMessage && new Date(existingMessage.timestamp) > new Date(timestamp)) {
            return state
          }

          return {
            lastMessages: {
              ...state.lastMessages,
              [chatRoomId]: { content, timestamp },
            },
          }
        }),
    }),
    {
      name: 'chat-storage',
    },
  ),
)
