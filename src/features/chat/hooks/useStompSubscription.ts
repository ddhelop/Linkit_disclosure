import { useEffect } from 'react'
import { ChatMessage } from '../types/ChatTypes'
import { useStompStore } from '@/shared/store/useStompStore'

interface UseStompSubscriptionProps {
  chatRoomId?: number
  onMessageReceived: (message: ChatMessage) => void
}

export const useStompSubscription = ({ chatRoomId, onMessageReceived }: UseStompSubscriptionProps) => {
  const stompClient = useStompStore((state) => state.stompClient)

  useEffect(() => {
    if (!chatRoomId || !stompClient?.connected) return

    const subscription = stompClient.subscribe(
      `/sub/chat/${chatRoomId}`,
      (message) => {
        const receivedMessage = JSON.parse(message.body)
        onMessageReceived(receivedMessage)
      },
      {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [chatRoomId, stompClient, onMessageReceived])

  const publish = (content: string) => {
    if (!stompClient?.connected || !chatRoomId) return

    stompClient.publish({
      destination: '/pub/chat/send',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ chatRoomId, content }),
    })
  }

  return { publish }
}
