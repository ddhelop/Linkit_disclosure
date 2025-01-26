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

export const handleScrap = async (emailId: string, isScrap: boolean) => {
  const response = await fetchWithAuth(`/api/v1/profile/scrap/${emailId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      changeScrapValue: !isScrap,
    }),
  })

  if (!response.ok) {
    throw new Error('스크랩 처리에 실패했습니다.')
  }

  return await response.json()
}
