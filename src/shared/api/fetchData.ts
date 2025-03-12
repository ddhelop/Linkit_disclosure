// src/shared/api/fetchData.ts
const BASE_URL = process.env.NEXT_PUBLIC_LINKIT_SERVER_URL || ''

import { deleteCookie, useAuthStore } from '@/shared/store/useAuthStore'
import useWebSocketStore from '@/shared/store/useWebSocketStore'

type FetchOptions = {
  revalidate?: number | false // ISR: 숫자(초), SSR: false, 기본값은 false(SSR)
  cache?: RequestCache // 캐시 전략
  tags?: string[] // 캐시 태그 (Next.js 캐시 무효화용)
}

function getAccessToken() {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='))
  return tokenCookie ? tokenCookie.split('=')[1].trim() : null
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { revalidate = false, cache, tags } = options

  try {
    const fetchOptions: RequestInit & { next?: any } = {}

    // credentials 설정
    fetchOptions.credentials = 'include'

    // 데이터 가져오기 전략 설정
    if (revalidate !== false) {
      // ISR 모드: 지정된 시간(초)마다 재검증
      fetchOptions.next = { revalidate }
    } else if (revalidate === false) {
      // SSR 모드: 항상 최신 데이터 가져오기
      fetchOptions.cache = 'no-store'
    }

    // 캐시 태그 설정 (있는 경우)
    if (tags && tags.length > 0) {
      fetchOptions.next = { ...fetchOptions.next, tags }
    }

    // 추가 캐시 옵션 설정 (있는 경우)
    if (cache) {
      fetchOptions.cache = cache
    }

    const res = await fetch(`${BASE_URL}/api/v1${endpoint}`, fetchOptions)

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`)
    }

    const apiResponse = await res.json()
    return apiResponse
  } catch (error) {
    console.error(`❌ API 호출 오류 (${endpoint}):`, error)
    throw error
  }
}

export async function fetchWithISR<T>(endpoint: string, revalidate: number = 60): Promise<T> {
  return fetchApi(endpoint, { revalidate })
}

export async function fetchWithSSR<T>(endpoint: string): Promise<T> {
  return fetchApi(endpoint, { revalidate: false })
}

export async function fetchWithCSR<T>(endpoint: string, options: RequestInit = {}, retry = true): Promise<T> {
  const accessToken = getAccessToken()

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken || ''}`,
  }

  // credentials 설정
  options.credentials = 'include'

  try {
    let response = await fetch(`${BASE_URL}/api/v1${endpoint}`, options)

    // 회원탈퇴 API 호출인 경우 모든 상태 코드를 정상 응답으로 처리
    if (endpoint.includes('/withdraw')) {
      const apiResponse = await response.json()
      return apiResponse
    }

    // 액세스 토큰 만료 시 (411)
    if (response.status === 411 && retry) {
      const refreshResponse = await fetch(`${BASE_URL}/api/v1/renew/token`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken || ''}`,
        },
      })

      if (refreshResponse.ok) {
        const data = await refreshResponse.json()
        document.cookie = `accessToken=${data.result.accessToken}; path=/`

        useWebSocketStore.getState().initializeClient(data.result.accessToken)

        // 새 토큰으로 재요청
        response = await fetch(`${BASE_URL}/api/v1${endpoint}`, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${data.result.accessToken}`,
          },
        })
      }
    }

    // 리프레시 토큰 만료 시 (403)
    if (response.status === 403) {
      useAuthStore.getState().setLoginState(false)
      deleteCookie('accessToken')
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.')
    }

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`)
    }

    const apiResponse = await response.json()
    return apiResponse
  } catch (error) {
    console.error(`❌ API 호출 오류 (${endpoint}):`, error)
    throw error
  }
}
