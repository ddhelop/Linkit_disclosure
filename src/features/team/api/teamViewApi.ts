import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

// 팀 로그 상세 페이지 조회
export async function getTeamLogDetail(teamName: string, logId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/${logId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team log detail')
  }
  return response.json()
}

// 팀원 공고 조회
export async function getTeamAnnouncement(teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/`)
  if (!response.ok) {
    throw new Error('Failed to fetch team announcement')
  }
  return response.json()
}

// 팀원 공고 상세 조회
export async function getTeamAnnouncementDetail(teamName: string, id: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/announcement/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team announcement detail')
  }
  return response.json()
}

// 팀원 조회
export async function getTeamMembers(teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/members/edit`)
  if (!response.ok) {
    throw new Error('Failed to fetch team members')
  }
  return response.json()
}

// 팀 프로덕트 조회
export async function getTeamProducts(teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/product`)
  if (!response.ok) {
    throw new Error('Failed to fetch team products')
  }
  return response.json()
}

// 팀 연혁 조회
export async function getTeamHistory(teamName: string) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/history/view`)
  if (!response.ok) {
    throw new Error('Failed to fetch team history')
  }
  return response.json()
}

// 팀원 초대 수락/거절
export async function acceptTeamInvitation(teamCode: string, isTeamJoin: boolean) {
  const response = await fetchWithAuth(`/api/v1/team/${teamCode}/member/join`, {
    method: 'POST',
    body: JSON.stringify({
      isTeamJoin,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to accept team invitation')
  }
  return response.json()
}
