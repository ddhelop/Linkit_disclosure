import { create } from 'zustand'
import { ChattingListType, ChatMessage } from '../types/ChatTypes'

interface ChatStore {
  chatList: ChattingListType[]
  updateChatList: (chatList: ChattingListType[]) => void
  updateLastMessage: (chatRoomId: number, message: string, time: string) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  chatList: [],

  updateChatList: (chatList) => set({ chatList }),

  updateLastMessage: (chatRoomId, message, time) =>
    set((state) => ({
      chatList: state.chatList.map((chat) =>
        chat.chatRoomId === chatRoomId
          ? {
              ...chat,
              chatPartnerInformation: {
                ...chat.chatPartnerInformation,
                lastMessage: message,
                lastMessageTime: time,
              },
            }
          : chat,
      ),
    })),
}))
