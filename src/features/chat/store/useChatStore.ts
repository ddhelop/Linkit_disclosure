import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatMessage, ChattingListType } from '../types/ChatTypes'

interface ChatStore {
  chatList: ChattingListType[]
  lastMessages: Record<
    number,
    {
      content: string
      timestamp: string
      unreadCount: number
      isOnline: boolean
    }
  >
  messages: Record<number, ChatMessage[]>
  updateChatList: (chatList: ChattingListType[]) => void
  updateLastMessage: (
    chatRoomId: number,
    content: string,
    timestamp: string,
    unreadCount?: number,
    isOnline?: boolean,
  ) => void
  addMessage: (chatRoomId: number, message: ChatMessage) => void
  setMessages: (chatRoomId: number, messages: ChatMessage[]) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatList: [],
      lastMessages: {},
      messages: {},
      updateChatList: (chatList) => set({ chatList }),
      updateLastMessage: (chatRoomId, content, timestamp) =>
        set((state) => ({
          lastMessages: {
            ...state.lastMessages,
            [chatRoomId]: {
              content,
              timestamp,
              unreadCount: state.lastMessages[chatRoomId]?.unreadCount ?? 0,
              isOnline: state.lastMessages[chatRoomId]?.isOnline ?? false,
            },
          },
          chatList: state.chatList.map((chat) =>
            chat.chatRoomId === chatRoomId
              ? {
                  ...chat,
                  chatPartnerInformation: {
                    ...chat.chatPartnerInformation,
                    lastMessage: content,
                    lastMessageTime: timestamp,
                  },
                }
              : chat,
          ),
        })),
      addMessage: (chatRoomId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: [message, ...(state.messages[chatRoomId] || [])],
          },
          lastMessages: {
            ...state.lastMessages,
            [chatRoomId]: {
              content: message.content,
              timestamp: message.timestamp,
              unreadCount: state.lastMessages[chatRoomId]?.unreadCount ?? 0,
              isOnline: state.lastMessages[chatRoomId]?.isOnline ?? false,
            },
          },
          chatList: state.chatList.map((chat) =>
            chat.chatRoomId === chatRoomId
              ? {
                  ...chat,
                  chatPartnerInformation: {
                    ...chat.chatPartnerInformation,
                    lastMessage: message.content,
                    lastMessageTime: message.timestamp,
                  },
                }
              : chat,
          ),
        })),
      setMessages: (chatRoomId, messages) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [chatRoomId]: messages,
          },
        })),
    }),
    {
      name: 'chat-storage',
    },
  ),
)
