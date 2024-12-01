import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface CreateProfileLogRequest {
  logTitle: string
  logContent: string
  isLogPublic: boolean
}

interface CreateProfileLogResponse {
  // API 응답 타입 정의
  success: boolean
  result: {
    id: number
    // ... 기타 응답 필드
  }
}

export const createProfileLog = async (data: CreateProfileLogRequest): Promise<CreateProfileLogResponse> => {
  const response = await fetchWithAuth('/api/v1/profile/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create profile log')
  }

  return response.json()
}
