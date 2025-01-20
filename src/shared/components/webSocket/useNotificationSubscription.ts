import { useEffect, useRef } from 'react'
import useWebSocketStore from '@/shared/store/useWebSocketStore'
import { useAuthStore } from '@/shared/store/useAuthStore'

export default function useNotificationSubscription(emailId: string) {
  const subscriptionRef = useRef<any>(null)
  const { getClient, isConnected } = useWebSocketStore()
  // const { incrementUnreadCount } = useNotificationStore()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    const client = getClient()
    if (!client?.connected || !emailId || !isLogin) return

    console.log('Subscribing to notifications for:', emailId)

    // 구독 전에 연결 상태 확인
    if (!client.active) {
      client.activate()
    }

    // 이전 구독이 있다면 해제
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe()
    }

    // 새로운 구독 생성
    subscriptionRef.current = client.subscribe(`/sub/notification/header/${emailId}`, (message) => {
      const notification = JSON.parse(message.body)
      console.log('New notification received:', notification)
    })

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
      }
    }
  }, [isConnected, emailId, isLogin])
}
