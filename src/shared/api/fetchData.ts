// src/shared/api/fetchData.ts
const BASE_URL = process.env.NEXT_PUBLIC_LINKIT_SERVER_URL || ''

/**
 * 공통 API 요청 함수
 * @param endpoint API 엔드포인트 (예: '/popular-log')
 * @returns JSON 데이터 반환
 */
export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1${endpoint}`, {
      cache: 'no-store', // 최신 데이터 유지 (SSR 적용)
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
