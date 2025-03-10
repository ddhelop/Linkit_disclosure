// src/shared/api/fetchData.ts
const BASE_URL = process.env.NEXT_PUBLIC_LINKIT_SERVER_URL || ''

type FetchOptions = {
  revalidate?: number | false // ISR: 숫자(초), SSR: false, 기본값은 false(SSR)
  cache?: RequestCache // 캐시 전략
  tags?: string[] // 캐시 태그 (Next.js 캐시 무효화용)
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { revalidate = false, cache, tags } = options

  try {
    const fetchOptions: RequestInit & { next?: any } = {}

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

export async function fetchWithCSR<T>(endpoint: string): Promise<T> {
  // 쿠키에서 액세스토큰 가져오기(document.cookie)
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1]
  try {
    const res = await fetch(`${BASE_URL}/api/v1${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    })

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
