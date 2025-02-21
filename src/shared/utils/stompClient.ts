import { Client } from '@stomp/stompjs'

const createStompClient = (accessToken: string) => {
  if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
    throw new Error('WebSocket URL is not defined in environment variables')
  }

  const stompClient = new Client({
    brokerURL: `${process.env.NEXT_PUBLIC_SOCKET_URL}/stomp/linkit`,
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    debug: (str) => {
      if (str === 'connected to server undefined') {
      } else {
      }
    },
    reconnectDelay: 10000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  })

  stompClient.activate()

  return stompClient
}

export default createStompClient
