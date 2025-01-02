import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ProfileInform, ScrapResponse, TeamInformMenu, TeamScrapResponse } from '../types/MatchTypes'

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

export const getTeamScraps = async (): Promise<TeamInformMenu[]> => {
  try {
    const response = await fetchWithAuth('/api/v1/team/scrap')
    if (!response.ok) {
      throw new Error('Failed to fetch team scraps')
    }
    const data: TeamScrapResponse = await response.json()
    return data.result.teamInformMenus
  } catch (error) {
    console.error('Error fetching team scraps:', error)
    throw error
  }
}
