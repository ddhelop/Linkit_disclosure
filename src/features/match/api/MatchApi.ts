import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ProfileInform, ScrapResponse } from '../types/MatchTypes'

export const getProfileScraps = async (): Promise<ProfileInform[]> => {
  try {
    const response = await fetchWithAuth('/api/v1/profile/scrap')
    if (!response.ok) {
      throw new Error('Failed to fetch profile scraps')
    }
    const data: ScrapResponse = await response.json()
    return data.result.profileInformMenus
  } catch (error) {
    console.error('Error fetching profile scraps:', error)
    throw error
  }
}
