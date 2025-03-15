// src/app/(home)/api/homeApi.ts
import { Announcement, TeamCard, TeamData } from '@/features/team/types/team.types'
import { fetchWithCSR, fetchWithISR, fetchWithSSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { LogCardType } from '@/shared/types/LogCardTypes'

import { Profile } from '@/shared/types/ProfileCardTypes'

// ✅ 인기 로그 가져오기
export async function getPopularLog(): Promise<ApiResponse<{ logInformMenus: LogCardType[] }>> {
  return fetchWithCSR('/home/logs')
}

// ✅ 모집 공고 가져오기
export async function getAnnouncements(): Promise<ApiResponse<{ announcementInformMenus: Announcement[] }>> {
  return fetchWithCSR('/home/announcement')
}

// ✅ 추천 팀 가져오기
export async function getRecommendedTeams(): Promise<ApiResponse<{ teamInformMenus: TeamCard[] }>> {
  return fetchWithCSR('/home/team')
}

// ✅ 추천 팀원 가져오기
export async function getRecommendedTeamMembers(): Promise<ApiResponse<{ profileInformMenus: Profile[] }>> {
  return fetchWithCSR('/home/profile')
}
