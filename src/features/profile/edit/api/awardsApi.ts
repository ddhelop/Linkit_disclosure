import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface AwardsRequest {
  awardsName: string
  awardsRanking: string
  awardsDate: string
  awardsOrganizer: string
  awardsDescription: string
}

export interface AwardsItem {
  profileAwardsId: number
  awardsName: string
  awardsRanking: string
  awardsDate: string
  isAwardsVerified: boolean
}

interface AwardsResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    profileAwardsItems: AwardsItem[]
  }
}

export const getAwards = async (): Promise<AwardsItem[]> => {
  try {
    const response = await fetchWithAuth('/api/v1/profile/awards')

    if (!response.ok) {
      throw new Error('Failed to fetch awards')
    }

    const data: AwardsResponse = await response.json()
    return data.result.profileAwardsItems
  } catch (error) {
    console.error('Error fetching awards:', error)
    throw error
  }
}

export const createAwards = async (awardsData: AwardsRequest) => {
  try {
    const response = await fetchWithAuth('/api/v1/profile/awards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(awardsData),
    })

    if (!response.ok) {
      throw new Error('Failed to create awards')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating awards:', error)
    throw error
  }
}

interface AwardDetail {
  profileAwardsId: number
  awardsName: string
  awardsRanking: string
  awardsDate: string
  awardsOrganizer: string
  awardsDescription: string
  isAwardsCertified: boolean
  isAwardsVerified: boolean
  awardsCertificationAttachFileName: string
  awardsCertificationAttachFilePath: string
}

export const getAwardById = async (id: string): Promise<AwardDetail> => {
  const response = await fetchWithAuth(`/api/v1/profile/awards/${id}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch award details')
  }

  const data = await response.json()
  return data.result
}
