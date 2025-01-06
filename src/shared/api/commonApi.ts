import { fetchWithAuth } from '../lib/api/fetchWithAuth'

// 팀 스크랩 및 취소
export const teamScrap = async (teamName: string, changeScrapValue: boolean) => {
  const response = await fetchWithAuth(`/api/v1/team/scrap/${teamName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      changeScrapValue,
    }),
  })
  return response
}

// 프로필 스크랩 및 취소
export const profileScrap = async (emailId: string, changeScrapValue: boolean) => {
  const response = await fetchWithAuth(`/api/v1/profile/scrap/${emailId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      changeScrapValue,
    }),
  })
  return response
}
