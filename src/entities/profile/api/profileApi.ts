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
