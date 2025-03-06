// src/shared/api/fetchData.ts
const BASE_URL = process.env.NEXT_PUBLIC_LINKIT_SERVER_URL || ''

/**
 * 데이터 가져오기 옵션 타입
 */
type FetchOptions = {
  revalidate?: number | false // ISR: 숫자(초), SSR: false, 기본값은 false(SSR)
  cache?: RequestCache // 캐시 전략
  tags?: string[] // 캐시 태그 (Next.js 캐시 무효화용)
}

/**
 * 공통 API 요청 함수
 * @param endpoint API 엔드포인트 (예: '/popular-log')
 * @param options 데이터 가져오기 옵션 (revalidate, cache, tags 등)
 * @returns JSON 데이터 반환
 */
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

/**
 * ISR 방식으로 데이터를 가져오는 함수
 * @param endpoint API 엔드포인트
 * @param revalidate 재검증 시간(초)
 * @returns JSON 데이터
 */
export async function fetchWithISR<T>(endpoint: string, revalidate: number = 60): Promise<T> {
  return fetchApi(endpoint, { revalidate })
}

/**
 * SSR 방식으로 데이터를 가져오는 함수 (항상 최신 데이터)
 * @param endpoint API 엔드포인트
 * @returns JSON 데이터
 */
export async function fetchWithSSR<T>(endpoint: string): Promise<T> {
  return fetchApi(endpoint, { revalidate: false })
}

/**
 * CSR 방식으로 데이터를 가져오는 함수 (클라이언트 측에서 호출)
 * @param endpoint API 엔드포인트
 * @returns JSON 데이터
 */
export async function fetchWithCSR<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1${endpoint}`)

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
