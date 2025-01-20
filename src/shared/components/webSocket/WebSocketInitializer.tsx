'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/shared/store/useAuthStore'
import useWebSocketStore from '@/shared/store/useWebSocketStore'

function getAccessToken() {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='))
  return tokenCookie ? tokenCookie.split('=')[1].trim() : null
}

export default function WebSocketInitializer() {
  const { isLogin, checkLogin } = useAuthStore()
  const { initializeClient, isConnected } = useWebSocketStore()

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) {
      checkLogin()
      if (!isConnected) {
        initializeClient(accessToken)
      }
    }
  }, [isLogin]) // isConnected는 의존성에서 제외

  return null
}
