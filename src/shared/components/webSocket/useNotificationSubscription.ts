import { useEffect } from 'react'
import useWebSocketStore from '@/shared/store/useWebSocketStore'
import useNotificationStore from '@/shared/store/useNotificationStore'
import { useAuthStore } from '@/shared/store/useAuthStore'

export default function useNotificationSubscription(emailId: string) {
  const client = useWebSocketStore((state) => state.client)
  // const { incrementUnreadCount } = useNotificationStore()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (!client?.connected || !emailId || !isLogin) return

    console.log('Subscribing to notifications for:', emailId)
    const subscription = client.subscribe(`/sub/notification/header/${emailId}`, (message) => {
      const notification = JSON.parse(message.body)
      console.log('New notification received:', notification)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [client?.connected, emailId, isLogin])
}
