import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface AwardsRequest {
  awardsName: string
  awardsRanking: string
  awardsDate: string
  awardsOrganizer: string
  awardsDescription: string
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
