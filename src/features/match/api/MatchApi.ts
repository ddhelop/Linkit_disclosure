import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import {
  ProfileInform,
  ScrapResponse,
  TeamInformMenu,
  TeamScrapResponse,
  MatchingMenuResponse,
  ReceiverType,
} from '../types/MatchTypes'

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

export const getRequestedMatchingMessages = async (
  page: number = 0,
  size: number = 20,
  receiverType?: ReceiverType,
): Promise<MatchingMenuResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    })

    if (receiverType) {
      queryParams.append('receiverType', receiverType)
    }

    const response = await fetchWithAuth(`/api/v1/matching/requested/menu?${queryParams}`)

    if (!response.ok) {
      throw new Error('Failed to fetch matching messages')
    }

    const data: MatchingMenuResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching matching messages:', error)
    throw error
  }
}

export const getMatchingMessages = async (
  page: number = 0,
  size: number = 20,
  receiverType?: ReceiverType,
): Promise<MatchingMenuResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    })

    if (receiverType) {
      queryParams.append('receiverType', receiverType)
    }

    const response = await fetchWithAuth(`/api/v1/matching/received/menu?${queryParams}`)

    if (!response.ok) {
      throw new Error('Failed to fetch matching messages')
    }

    const data: MatchingMenuResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching matching messages:', error)
    throw error
  }
}
