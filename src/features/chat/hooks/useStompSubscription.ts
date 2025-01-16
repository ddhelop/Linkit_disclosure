import { useEffect, useRef } from 'react'
import { Client, StompHeaders } from '@stomp/stompjs'
import { ChatMessage } from '../types/ChatTypes'

interface UseStompSubscriptionProps {
  chatRoomId?: number
  onMessageReceived: (message: ChatMessage) => void
}

export const useStompSubscription = ({ chatRoomId, onMessageReceived }: UseStompSubscriptionProps) => {
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    if (!chatRoomId) return

    const accessToken = localStorage.getItem('accessToken')

    const headers: StompHeaders = {
      Authorization: `Bearer ${accessToken}`,
    }
    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_SOCKET_URL,
      connectHeaders: headers,
      onConnect: () => {
        console.log('Connected to WebSocket')
        client.subscribe(
          `/sub/chat/${chatRoomId}`,
          (message) => {
            const receivedMessage = JSON.parse(message.body)
            onMessageReceived(receivedMessage)
          },
          headers,
        )
      },
    })

    clientRef.current = client
    client.activate()

    return () => {
      if (client.connected) {
        client.deactivate()
      }
    }
  }, [chatRoomId, onMessageReceived])

  return clientRef.current
}
