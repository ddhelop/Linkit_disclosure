import { create } from 'zustand'
import { Client } from '@stomp/stompjs'

interface WebSocketState {
  client: Client | null
  initializeClient: (token: string) => void
  disconnectClient: () => void
}

const useWebSocketStore = create<WebSocketState>((set, get) => ({
  client: null,

  initializeClient: (token: string) => {
    const { client } = get()
    if (client?.connected) {
      console.log('WebSocket already connected')
      return
    }

    const newClient = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_SOCKET_URL}`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket server')
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame)
      },
    })

    newClient.activate()
    set({ client: newClient })
  },

  disconnectClient: () => {
    const { client } = get()
    if (client?.connected) {
      client.deactivate()
      set({ client: null })
    }
  },
}))

export default useWebSocketStore
