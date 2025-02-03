import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ProfileDetailData } from '../model/types'

interface ApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: ProfileDetailData
}

export const getProfileDetail = async (emailId: string): Promise<ProfileDetailData> => {
  const response = await fetchWithAuth(`/api/v1/profile/${emailId}`)
  const data: ApiResponse = await response.json()
  return data.result
}

// 포트폴리오 목록 뷰어 조회
export const getProfilePortfolioList = async (emailId: string) => {
  const response = await fetchWithAuth(`/api/v1/profile/portfolio/view/${emailId}`, {
    method: 'GET',
  })

  if (!response.ok) {
    return response.json()
  }

  return response.json()
}
