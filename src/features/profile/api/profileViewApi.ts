import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export async function fetchProfileDetailData(emailId: string) {
  const response = await fetchWithAuth(`/api/v1/profile/${emailId}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('프로필 조회에 실패했습니다.')
  }

  return await response.json()
}
