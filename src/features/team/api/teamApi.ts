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
// 팀 상세조회
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

interface AnnouncementSkill {
  announcementSkillName: string
}

interface CreateRecruitmentRequest {
  announcementTitle: string
  majorPosition: string
  subPosition: string
  announcementSkillNames: AnnouncementSkill[]
  announcementStartDate: string
  announcementEndDate: string
  cityName: string
  divisionName: string
  isRegionFlexible: boolean
  mainTasks: string
  workMethod: string
  idealCandidate: string
  preferredQualifications?: string
  joiningProcess?: string
  benefits?: string
}

export async function createRecruitment(data: CreateRecruitmentRequest, teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create recruitment')
  }
  return response.json()
}

interface InviteMemberRequest {
  teamMemberInvitationEmail: string
  teamMemberType: 'TEAM_MANAGER' | 'TEAM_VIEWER'
}

export async function inviteTeamMember(
  data: { teamMemberInvitationEmail: string; teamMemberType: string },
  teamName: string,
) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/member`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '팀원 초대에 실패했습니다.')
  }

  return response.json()
}

interface TeamProductRequest {
  productName: string
  productLineDescription: string
  projectSize: 'PERSONAL' | 'TEAM'
  productHeadCount: number
  productTeamComposition: string
  productStartDate: string
  productEndDate: string | null
  isProductInProgress: boolean
  teamProductLinks: {
    productLinkName: string
    productLinkPath: string
  }[]
  productDescription: string
}

export async function createTeamProduct(
  teamName: string,
  data: TeamProductRequest,
  mainImage: File | null,
  subImages: { id: number; file: File }[],
) {
  const formData = new FormData()

  // JSON 데이터 추가
  formData.append('addTeamProductRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }))

  // 대표 이미지 추가
  if (mainImage) {
    formData.append('productRepresentImage', mainImage)
  }

  // 서브 이미지들 추가
  subImages.forEach(({ file }) => {
    formData.append('productSubImages', file)
  })

  const response = await fetchWithAuth(`/api/v1/team/${teamName}/product`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to create team product')
  }

  return response.json()
}
