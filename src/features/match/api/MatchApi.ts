import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import {
  ProfileInform,
  ScrapResponse,
  TeamInformMenu,
  TeamScrapResponse,
  MatchingMenuResponse,
  ReceiverType,
  AnnouncementScrapResponse,
  MatchingProfileMenuResponse,
  AnnouncementInformMenu,
  SenderType,
} from '../types/MatchTypes'
import { Profile } from '@/shared/types/ProfileCardTypes'

import { ApiResponse } from '@/shared/types/ApiResponse'
import { TeamCard, TeamData } from '@/features/team/types/team.types'

export const getProfileScraps = async (): Promise<ApiResponse<{ profileInformMenus: Profile[] }>> => {
  try {
    const response = await fetchWithAuth('/api/v1/profile/scrap')
    if (!response.ok) {
      throw new Error('Failed to fetch profile scraps')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching profile scraps:', error)
    throw error
  }
}

export const getTeamScraps = async (): Promise<ApiResponse<{ teamInformMenus: TeamCard[] }>> => {
  try {
    const response = await fetchWithAuth('/api/v1/team/scrap')
    if (!response.ok) {
      throw new Error('Failed to fetch team scraps')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching team scraps:', error)
    throw error
  }
}

export const getAnnouncementScraps = async () => {
  try {
    const response = await fetchWithAuth('/api/v1/announcement/scrap')
    const data = await response.json()
    return data.result.announcementInformMenus
  } catch (error) {
    console.error('Error fetching announcement scraps:', error)
    throw error
  }
}

export const getRequestedMatchingMessages = async (
  page: number = 0,
  size: number = 20,
  receiverType?: ReceiverType,
  senderType?: SenderType,
): Promise<MatchingMenuResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    })
    if (receiverType) {
      queryParams.append('receiverType', receiverType)
    }
    if (senderType) {
      queryParams.append('senderType', senderType)
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

export const markMatchingAsRead = async (matchingIds: number[]): Promise<void> => {
  try {
    const response = await fetchWithAuth('/api/v1/matching/received/menu/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchingIds }),
    })

    if (!response.ok) {
      throw new Error('Failed to mark matching as read')
    }
  } catch (error) {
    console.error('Error marking matching as read:', error)
    throw error
  }
}

export const updateMatchingStatus = async (matchingId: number, status: 'COMPLETED' | 'DENIED'): Promise<void> => {
  try {
    const response = await fetchWithAuth(`/api/v1/matching/${matchingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchingStatusType: status }),
    })

    if (!response.ok) {
      throw new Error('Failed to update matching status')
    }
  } catch (error) {
    console.error('Error updating matching status:', error)
    throw error
  }
}

export const deleteMatchings = async (matchingIds: number[]): Promise<void> => {
  try {
    const response = await fetchWithAuth('/api/v1/matching/received/menu/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matchingIds }),
    })

    if (!response.ok) {
      throw new Error('Failed to delete matchings')
    }
  } catch (error) {
    console.error('Error deleting matchings:', error)
    throw error
  }
}

export const deleteRequestedMatchings = async (matchingIds: number[]) => {
  const response = await fetchWithAuth('/api/v1/matching/requested/menu/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchingIds }),
  })

  if (!response.ok) {
    return response.json()
  }

  return response.json()
}

export const getMatchingProfileMenu = async (emailId: string): Promise<MatchingProfileMenuResponse> => {
  const response = await fetchWithAuth(`/api/v1/matching/profile/${emailId}/select/request/menu`)
  const data = await response.json()
  return data.result
}

interface MatchingRequest {
  senderType: 'PROFILE' | 'TEAM'
  receiverType: 'PROFILE' | 'TEAM' | 'ANNOUNCEMENT'
  senderEmailId?: string
  senderTeamCode?: string
  receiverEmailId?: string
  receiverTeamCode?: string
  requestMessage: string
  receiverAnnouncementId?: number
}

export const sendMatchingRequest = async (requestData: MatchingRequest) => {
  const response = await fetchWithAuth('/api/v1/matching', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })

  if (!response.ok) {
    throw new Error('Failed to send matching request')
  }

  return response.json()
}

export const getMatchingTeamMenu = async (teamCode: string) => {
  const response = await fetchWithAuth(`/api/v1/matching/team/${teamCode}/menu`)
  if (!response.ok) {
    throw new Error('Failed to fetch team matching menu')
  }
  return response.json()
}

export const getTeamMatchingRequestMenu = async (teamCode: string) => {
  const response = await fetchWithAuth(`/api/v1/matching/team/${teamCode}/select/request/menu`)
  if (!response.ok) {
    throw new Error('Failed to fetch team matching request menu')
  }
  return response.json()
}

export const sendTeamMatchingRequest = async (requestData: {
  senderType: 'PROFILE' | 'TEAM'
  senderEmailId?: string
  senderTeamCode?: string
  receiverTeamCode: string
  requestMessage: string
}) => {
  const response = await fetchWithAuth('/api/v1/matching/team/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })

  if (!response.ok) {
    throw new Error('Failed to send team matching request')
  }

  return response.json()
}
