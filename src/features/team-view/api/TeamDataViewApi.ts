import { Announcement } from '@/features/team/types/team.types'
import { fetchWithCSR, fetchWithSSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'

import { TeamData, TeamLog } from '@/shared/types/TeamType'

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
