import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

import { Announcement, TeamCard, TeamData, TeamLog, TeamProductView } from '../types/team.types'
import { ApiResponse } from '@/shared/types/ApiResponse'

export const createTeam = async (formData: FormData) => {
  try {
    const response = await fetchWithAuth('/api/v1/team', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create team')
    }

    return response
  } catch (error) {
    console.error('Error creating team:', error)
    throw error
  }
}

export const getMyTeams = async (): Promise<ApiResponse<TeamData[]>> => {
  const response = await fetchWithAuth('/api/v1/my/teams')
  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }
  return response.json()
}

export async function getTeamLogs(teamName: string): Promise<ApiResponse<TeamLog[]>> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log`)
  if (!response.ok) {
    throw new Error('Failed to fetch team logs')
  }
  return response.json()
}

// 팀 대표 로그 단일 조회
export async function getTeamRepresentativeLog(teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/represent`)
  if (!response.ok) {
    throw new Error('Failed to fetch team representative log')
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
    isTeamPublic: boolean

    teamInformMenu: {
      teamCurrentStates: Array<{ teamStateName: string }>
      teamName: string
      teamShortDescription: string
      teamLogoImagePath: string
      teamScaleItem: {
        teamScaleName: string
      }
      teamCode: string
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

interface UpdateTeamBasicInfoResponse {
  isSuccess: boolean
  code: string
  message: string
  result: TeamBasicInfo['result'] // 기존 TeamBasicInfo의 result 타입 재사용
}

export async function updateTeamBasicInfo(formData: FormData, teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update team info')
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
  announcementEndDate: string
  cityName: string
  divisionName: string
  isRegionFlexible: boolean
  mainTasks: string
  isPermanentRecruitment: boolean
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
  productField: string
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

export async function getTeamProducts(
  teamName: string,
): Promise<ApiResponse<{ isTeamManager: boolean; teamProductViewItems: TeamProductView[] }>> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/product/view`)
  if (!response.ok) {
    throw new Error('Failed to fetch team products')
  }
  return response.json()
}

// 팀 프로덕트 삭제
export async function deleteTeamProduct(teamName: string, productId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/product/${productId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete team product')
  }

  return response
}

// 팀 프로덕트 상세 조회
export async function getTeamProduct(teamName: string, productId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/product/${productId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team product')
  }
  return response.json()
}

// 팀 프로덕트 수정
export async function updateTeamProduct(
  teamName: string,
  productId: number,
  data: TeamProductRequest,
  mainImage: File | null,
  subImages: { id: number; file: File }[],
) {
  const formData = new FormData()

  // JSON 데이터 추가
  formData.append('updateTeamProductRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }))

  // 대표 이미지 추가
  if (mainImage) {
    formData.append('productRepresentImage', mainImage)
  }

  // 서브 이미지들 추가
  subImages.forEach(({ file }) => {
    formData.append('productSubImages', file)
  })

  const response = await fetchWithAuth(`/api/v1/team/${teamName}/product/${productId}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to update team product')
  }

  return response.json()
}

interface TeamHistoryRequest {
  historyName: string
  historyStartDate: string
  historyEndDate: string | null
  isHistoryInProgress: boolean
  historyDescription: string
}

export async function createTeamHistory(teamName: string, data: TeamHistoryRequest) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create team history')
  }

  return response.json()
}

export async function updateTeamHistory(teamName: string, historyId: number, data: TeamHistoryRequest) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/history/${historyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export interface TeamAnnouncementDetail {
  isSuccess: boolean
  code: string
  message: string
  result: {
    teamMemberAnnouncementId: number
    announcementTitle: string
    announcementScrapCount: number
    isPermanentRecruitment: boolean
    isAnnouncementScrap: boolean
    announcementPositionItem: {
      majorPosition: string
      subPosition: string
    }
    announcementSkillNames: {
      announcementSkillName: string
    }[]
    projectType: string
    workType: string
    isAnnouncementPublic: boolean
    isAnnouncementInProgress: boolean
    announcementEndDate: string
    mainTasks: string
    workMethod: string
    idealCandidate: string
    preferredQualifications?: string
    joiningProcess?: string
    benefits?: string
  }
}

interface TeamAnnouncementResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    teamMemberAnnouncementItems: Announcement[]
  }
}

export async function getTeamAnnouncements(teamName: string): Promise<TeamAnnouncementResponse> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement`)
  if (!response.ok) {
    throw new Error('Failed to fetch team announcements')
  }
  return response.json()
}
// 뷰어 모드
export async function getTeamAnnouncementsView(teamName: string): Promise<TeamAnnouncementResponse> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/view`)
  if (!response.ok) {
    throw new Error('Failed to fetch team announcements')
  }
  return response.json()
}

interface TeamMember {
  profileImagePath: string
  memberName: string
  majorPosition: string
  teamMemberType: 'TEAM_MANAGER' | 'TEAM_VIEWER'
  teamMemberInviteState: 'ACCEPTED' | 'PENDING'
}

interface PendingTeamMember {
  teamMemberInvitationEmail: string
  teamMemberType: 'TEAM_MANAGER' | 'TEAM_VIEWER'
  teamMemberInviteState: 'PENDING'
}

interface TeamMembersResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    isTeamOwner: boolean
    isTeamManager: boolean
    acceptedTeamMemberItems: TeamMember[]
    pendingTeamMemberItems: PendingTeamMember[]
  }
}

// 팀원 공고 삭제
export async function deleteTeamAnnouncement(teamName: string, announcementId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/${announcementId}`, {
    method: 'DELETE',
  })
}

// 팀원 공고 공개/비공개 전환
export async function toggleTeamAnnouncementPublic(teamName: string, announcementId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/state/${announcementId}`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to toggle team announcement public')
  }

  return response.json()
}

// 팀원 공고 모집 마감 여부 수정
export async function toggleTeamAnnouncementClose(teamName: string, announcementId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/close/${announcementId}`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to toggle team announcement close')
  }

  return response.json()
}

export async function getTeamAnnouncement(teamName: string, id: number): Promise<TeamAnnouncementDetail> {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team announcement')
  }
  return response.json()
}

// 팀원 공고 수정
export async function updateTeamAnnouncement(
  teamName: string,
  id: number,
  data: CreateRecruitmentRequest, // 기존 CreateRecruitmentRequest 인터페이스 재사용
) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update team announcement')
  }

  return response.json()
}

// 팀 연혁 리스트 조회
export async function getTeamHistory(teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/history`)
  if (!response.ok) {
    throw new Error('Failed to fetch team history')
  }
  return response.json()
}

// 팀 연혁 단일 조회
export async function getTeamHistoryDetail(teamName: string, historyId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/history/${historyId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team history detail')
  }
  return response.json()
}

// 팀 연혁 단일 삭제
export async function deleteTeamHistory(teamName: string, historyId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/history/${historyId}`, {
    method: 'DELETE',
  })
}

// 팀 스크랩
export async function teamScrap(teamName: string, isScrap: boolean) {
  const response = await fetchWithAuth(`/api/v1/team/scrap/${teamName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      changeScrapValue: isScrap,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    return data
  }

  return data
}

// 팀 삭제하기
export async function deleteTeam(teamCode: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamCode}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    return response.json()
  }

  return response.json()
}

// 팀 삭제 수락 요청/거절
export async function requestTeamDelete(teamCode: string, teamMemberManagingTeamState: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamCode}/managing/teamState`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ teamMemberManagingTeamState }),
  })

  if (!response.ok) {
    throw new Error('Failed to request team delete')
  }

  return response.json()
}

// 팀 나가기
export async function leaveTeam(teamCode: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamCode}/member/out`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return response.json()
  }

  return response.json()
}

// 팀원 권한 변경
export async function updateMemberType(teamCode: string, emailId: string, teamMemberType: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamCode}/member/type/${emailId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      teamMemberType,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update member type')
  }

  return response.json()
}

// 팀원 삭제
export async function removeMember(teamCode: string, emailId: string, isPending: boolean) {
  const response = await fetchWithAuth(`/api/v1/team/${teamCode}/member/remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      teamMemberRegisterType: isPending ? 'PENDING' : 'ACCEPTED',
      removeIdentifier: emailId, // isPending ? email : emailId
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to remove team member')
  }

  return response.json()
}
