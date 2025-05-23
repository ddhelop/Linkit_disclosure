import {
  Announcement,
  TeamCard,
  TeamData,
  TeamLog,
  TeamMember,
  TeamProductView,
} from '@/features/team/types/team.types'
import { TeamHistory, TeamHistoryCalendar } from '@/features/team/types/teamHistory.types'

import { fetchWithCSR, fetchWithSSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { ProfileVisitor } from '@/shared/types/profile/ProfileDetailType'

// ✅ 팀 Info 조회
export async function getTeamDetail(teamName: string): Promise<ApiResponse<TeamData>> {
  return fetchWithCSR(`/team/${teamName}`)
}

// 팀 카드 정보 조회 SSR
export async function getTeamCard(teamName: string): Promise<ApiResponse<TeamData>> {
  return fetchWithCSR(`/team/${teamName}`)
}

// ✅ 팀 로그 목록 조회
export async function getTeamLogList(teamName: string): Promise<ApiResponse<{ teamLogItems: TeamLog[] }>> {
  return fetchWithSSR(`/team/${teamName}/log`)
}

// ✅ 팀 로그 상세 조회
export async function getTeamLogDetail(teamName: string, id: number): Promise<ApiResponse<TeamLog>> {
  return fetchWithCSR(`/team/${teamName}/log/${id}`)
}

// ✅ 팀 채용 공고 목록 조회
export async function getTeamRecruitmentList(
  teamName: string,
): Promise<ApiResponse<{ isTeamManager: boolean; teamMemberAnnouncementItems: Announcement[] }>> {
  return fetchWithCSR(`/team/${teamName}/announcement`)
}

// ✅ 팀 채용 공고 상세 조회
export async function getTeamRecruitment(teamName: string, id: number): Promise<ApiResponse<Announcement>> {
  return fetchWithCSR(`/team/${teamName}/announcement/${id}`)
}

// ✅ 승인된 팀 멤버 목록 조회
export async function getTeamMembers(
  teamName: string,
): Promise<ApiResponse<{ isTeamManager: boolean; acceptedTeamMemberItems: TeamMember[] }>> {
  return fetchWithCSR(`/team/${teamName}/members/view`)
}

// ✅ 팀 프로덕트 목록 조회
export async function getTeamProducts(
  teamName: string,
): Promise<ApiResponse<{ isTeamManager: boolean; teamProductItems: TeamProductView[] }>> {
  return fetchWithCSR(`/team/${teamName}/product/view`)
}

// ✅ 팀 연혁 리스트 전체 조회
export async function getTeamHistoryList(teamName: string): Promise<ApiResponse<{ teamHistoryItems: TeamHistory[] }>> {
  return fetchWithCSR(`/team/${teamName}/history`, {
    cache: 'no-store',
  })
}

// ✅ 팀 연혁 캘린더 조회
export async function getTeamHistoryCalendar(
  teamName: string,
): Promise<ApiResponse<{ isTeamManager: boolean; teamHistoryCalendar: TeamHistoryCalendar }>> {
  return fetchWithCSR(`/team/${teamName}/history/view`)
}

// 팀 목록 조회
export async function getTeamList(): Promise<ApiResponse<{ teamInformMenus: TeamCard[] }>> {
  return fetchWithCSR(`/my/teams`)
}

// 팀 방문자 목록 조회
export async function getTeamVisitors(teamCode: string): Promise<ApiResponse<{ visitInforms: ProfileVisitor[] }>> {
  return fetchWithCSR(`/team/${teamCode}/visit`)
}
