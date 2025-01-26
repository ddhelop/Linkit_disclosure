import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface MemberBasicInform {
  memberBasicInformId: number
  memberName: string
  contact: string
  email: string
  platform: string
  isMarketingAgree: boolean
  emailId: string
}

export const getMemberBasicInform = async (): Promise<MemberBasicInform> => {
  const response = await fetchWithAuth('/api/v1/member/basic-inform', {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch member information')
  }

  const data = await response.json()
  return data.result
}
