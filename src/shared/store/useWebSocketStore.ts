import { create } from 'zustand'
import { Client } from '@stomp/stompjs'

// 싱글톤으로 WebSocket 클라이언트 관리
let stompClient: Client | null = null

interface WebSocketState {
  isConnected: boolean
  initializeClient: (token: string) => void
  disconnectClient: () => void
  getClient: () => Client | null
  reconnect: () => void
}

const useWebSocketStore = create<WebSocketState>((set, get) => ({
  isConnected: false,

  initializeClient: (token: string) => {
    if (stompClient?.connected) {
      ;('WebSocket already connected')
      return
    }

    // 기존 클라이언트가 있다면 정리
    if (stompClient?.active) {
      stompClient.deactivate()
    }

    stompClient = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_SOCKET_URL}/stomp/linkit`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    })

    stompClient.onConnect = () => {
      set({ isConnected: true })
    }

    stompClient.onDisconnect = () => {
      set({ isConnected: false })
    }

    stompClient.onStompError = (frame) => {
      set({ isConnected: false })
    }

    stompClient.onWebSocketError = (event) => {
      set({ isConnected: false })
    }

    stompClient.onWebSocketClose = () => {
      set({ isConnected: false })
      // 자동 재연결 시도
      setTimeout(() => get().reconnect(), 5000)
    }

    try {
      stompClient.activate()
    } catch (error) {
      set({ isConnected: false })
    }
  },

  disconnectClient: () => {
    if (stompClient) {
      try {
        if (stompClient.connected) {
          stompClient.deactivate()
        }
        stompClient = null
        set({ isConnected: false })
      } catch (error) {
        console.error('Error disconnecting WebSocket:', error)
      }
    }
  },

  getClient: () => stompClient,

  reconnect: () => {
    const client = get().getClient()
    if (client && !client.active) {
      try {
        client.activate()
      } catch (error) {
        console.error('Failed to reconnect:', error)
        set({ isConnected: false })
      }
    }
  },
}))

export default useWebSocketStore
