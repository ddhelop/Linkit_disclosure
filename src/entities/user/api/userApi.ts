import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export interface UserBasicInfo {
  memberBasicInformId: number
  memberName: string
  contact: string
  email: string
  emailId: string
  isServiceUseAgree: boolean
  isPrivateInformAgree: boolean
  isAgeCheck: boolean
  isMarketingAgree: boolean
  platform: string
}

export const getUserBasicInfo = async (): Promise<UserBasicInfo> => {
  const response = await fetchWithAuth('/api/v1/member/basic-inform')
  const data = await response.json()
  return data.result
}
