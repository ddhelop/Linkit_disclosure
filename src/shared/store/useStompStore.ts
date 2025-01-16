import { create } from 'zustand'
import { Client } from '@stomp/stompjs'
import createStompClient from '../utils/stompClient'

interface StompStore {
  stompClient: Client | null
  connect: (accessToken: string) => void
  disconnect: () => void
}

export const useStompStore = create<StompStore>((set) => ({
  stompClient: null,
  connect: (accessToken: string) => {
    const client = createStompClient(accessToken)
    set({ stompClient: client })
  },
  disconnect: () => {
    set((state) => {
      if (state.stompClient?.connected) {
        state.stompClient.deactivate()
      }
      return { stompClient: null }
    })
  },
}))
