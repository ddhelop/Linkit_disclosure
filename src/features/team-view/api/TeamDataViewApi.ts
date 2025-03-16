import {
  Announcement,
  TeamCard,
  TeamData,
  TeamLog,
  TeamMember,
  TeamProductView,
} from '@/features/team/types/team.types'

import { fetchWithCSR, fetchWithSSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { ProfileVisitor } from '@/shared/types/profile/ProfileDetailType'

// ✅ 팀 Info 조회
export async function getTeamDetail(teamName: string): Promise<ApiResponse<TeamData>> {
  return fetchWithCSR(`/team/${teamName}`)
}

// 팀 카드 정보 조회 SSR
export async function getTeamCard(teamName: string): Promise<ApiResponse<TeamData>> {
  return fetchWithSSR(`/team/${teamName}`)
}

// ✅ 팀 로그 목록 조회
export async function getTeamLogList(teamName: string): Promise<ApiResponse<{ teamLogItems: TeamLog[] }>> {
  return fetchWithSSR(`/team/${teamName}/log`)
}

// ✅ 팀 채용 공고 목록 조회
export async function getTeamRecruitmentList(
  teamName: string,
): Promise<ApiResponse<{ teamMemberAnnouncementItems: Announcement[] }>> {
  return fetchWithCSR(`/team/${teamName}/announcement`)
}

// ✅ 승인된 팀 멤버 목록 조회
export async function getTeamMembers(
  teamName: string,
): Promise<ApiResponse<{ isTeamManager: boolean; acceptedTeamMemberItems: TeamMember[] }>> {
  return fetchWithCSR(`/team/${teamName}/members/view`)
}

// ✅ 팀 프로덕트 목록 조회
export async function getTeamProducts(teamName: string): Promise<ApiResponse<{ teamProductItems: TeamProductView[] }>> {
  return fetchWithCSR(`/team/${teamName}/product/view`)
}

// 팀 목록 조회
export async function getTeamList(): Promise<ApiResponse<{ teamInformMenus: TeamCard[] }>> {
  return fetchWithCSR(`/my/teams`)
}

// 팀 방문자 목록 조회
export async function getTeamVisitors(teamCode: string): Promise<ApiResponse<{ visitInforms: ProfileVisitor[] }>> {
  return fetchWithCSR(`/team/${teamCode}/visit`)
}
