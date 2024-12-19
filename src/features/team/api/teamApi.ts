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

export async function getTeamLog(teamName: string, logId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/${logId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team log')
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

export async function updateTeamLog(
  teamName: string,
  logId: number,
  logData: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  },
) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/${logId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  })

  if (!response.ok) {
    throw new Error('Failed to update team log')
  }

  return response.json()
}

export async function createTeamLog(
  teamName: string,
  logData: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  },
) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(logData),
  })

  if (!response.ok) {
    throw new Error('Failed to create team log')
  }

  return response.json()
}

export async function setTeamLogAsRepresentative(teamName: string, logId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/type/${logId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to set representative log')
  }
  return response.json()
}

export async function toggleTeamLogVisibility(teamName: string, logId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/state/${logId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to toggle log visibility')
  }
  return response.json()
}

interface TeamBasicInfo {
  isSuccess: boolean
  code: string
  message: string
  result: {
    isMyTeam: boolean
    teamInformMenu: {
      teamCurrentStates: Array<{ teamStateName: string }>
      teamName: string
      teamShortDescription: string
      teamLogoImagePath: string
      teamScaleItem: {
        teamScaleName: string
      }
      regionDetail: {
        cityName: string
        divisionName: string
      }
    }
  }
}

export async function getTeamBasicInfo(teamName: string): Promise<TeamBasicInfo> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team info')
  }
  return response.json()
}

interface UpdateTeamRequest {
  teamName: string
  teamShortDescription: string
  scaleName: string
  cityName: string
  divisionName: string
  teamStateNames: string[]
  isTeamPublic: boolean
}

export async function updateTeamBasicInfo(formData: FormData, teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to update team info')
  }
  return response.json()
}
