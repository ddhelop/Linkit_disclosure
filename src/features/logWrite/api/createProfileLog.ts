import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export const createProfileLog = async (logData: { logTitle: string; logContent: string; isLogPublic: boolean }) => {
  try {
    const res = await fetchWithAuth('/api/v1/profile/log', {
      method: 'POST',
      body: JSON.stringify(logData),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })

    if (!res.ok) throw new Error('프로필 로그 생성 실패')

    // 응답이 비어있는지 확인
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await res.json()
    } else {
      // JSON이 아닌 경우 텍스트로 반환
      return { success: true, message: await res.text() }
    }
  } catch (error) {
    console.error('프로필 로그 생성 오류:', error)
    throw error
  }
}
