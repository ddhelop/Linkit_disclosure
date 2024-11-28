import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface Education {
  profileEducationId: number
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  isAttendUniversity: boolean
  isEducationVerified: boolean
}

interface GetEducationsResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    profileEducationItems: Education[]
  }
}

export const getEducations = async (): Promise<GetEducationsResponse> => {
  const response = await fetchWithAuth('/api/v1/profile/education')
  const data = await response.json()
  return data
}
