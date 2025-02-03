// src/features/profile/api/authApi.ts

import { useToast } from '@/shared/hooks/useToast'
import { useAuthStore } from '@/shared/store/useAuthStore'
import useWebSocketStore from '@/shared/store/useWebSocketStore'

function getAccessToken() {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='))
  return tokenCookie ? tokenCookie.split('=')[1].trim() : null
}

// 인증이 필요한 요청을 처리하는 함수
export async function fetchWithAuth(url: string, options: RequestInit = {}, retry = true) {
  const apiUrl = `${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}${url}`
  const accessToken = getAccessToken()

  options.headers = {
    // 'Content-Type': 'application/json',
    ...options.headers,
    Authorization: `Bearer ${accessToken || ''}`,
  }

  // credentials를 fetch 옵션의 최상위 레벨로 이동
  options.credentials = 'include'

  try {
    const response = await fetch(apiUrl, options)

    // 회원탈퇴 API 호출인 경우 모든 상태 코드를 정상 응답으로 처리
    if (url.includes('/api/v1/withdraw')) {
      return response
    }

    // 리프레시 토큰 만료 시 (403)
    if (response.status === 403) {
      useAuthStore.getState().setLoginState(false)
      if (typeof window !== 'undefined') {
        // 쿠키 삭제
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      }
      return response.json()
    }

    // 액세스 토큰 만료 시 (450)
    if (response.status === 450 && retry) {
      try {
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/renew/token`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken || ''}`,
          },
        })
        if (!refreshResponse.ok) {
          throw new Error('Token refresh failed')
        }
        const data = await refreshResponse.json()

        // 새 토큰으로 쿠키 업데이트
        document.cookie = `accessToken=${data.result.accessToken}; path=/; max-age=3600`

        // 웹소켓 재연결 추가
        useWebSocketStore.getState().initializeClient(data.result.accessToken)

        // 새 토큰으로 재요청
        return fetch(apiUrl, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${data.result.accessToken}`,
          },
        })
      } catch (error) {
        console.error('Token refresh failed:', error)
        return response
      }
    }

    return response
  } catch (error) {
    if (url.includes('/api/v1/withdraw')) {
      return null
    }
    console.error('Fetch error:', error)
    return null
  }
}
