import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { TeamInfoResponse, TeamResponse, TeamLogsResponse } from '../types/team.types'

interface CreateTeamRequest {
  teamName: string
  teamShortDescription: string
  scaleName: string
  cityName: string
  divisionName: string
  teamStateNames: string[]
  isTeamPublic: boolean
}

export const createTeam = async (formData: FormData) => {
  try {
    if (formData.get('teamLogoImage')) {
      const response = await fetchWithAuth('/api/v1/team', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create team')
      }

      return await response.json()
    }
  } catch (error) {
    console.error('Error creating team:', error)
    throw error
  }
}

export const getMyTeams = async (): Promise<TeamResponse> => {
  const response = await fetchWithAuth('/api/v1/my/teams')
  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }
  return response.json()
}

export async function getTeamInfo(teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team info')
  }
  return response.json() as Promise<TeamInfoResponse>
}

export async function getTeamLogs(teamName: string): Promise<TeamLogsResponse> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log`)
  if (!response.ok) {
    throw new Error('Failed to fetch team logs')
  }
  return response.json()
}

export async function deleteTeamLog(teamName: string, logId: number): Promise<void> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/${logId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete team log')
  }
}
