// src/app/(home)/api/homeApi.ts
import { Announcement, TeamCard, TeamData } from '@/features/team/types/team.types'
import { fetchWithISR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { LogCardType } from '@/shared/types/LogCardTypes'

import { Profile } from '@/shared/types/ProfileCardTypes'

// ✅ 인기 로그 가져오기
export async function getPopularLog(): Promise<ApiResponse<{ logInformMenus: LogCardType[] }>> {
  return fetchWithISR('/home/logs', 1)
}

// ✅ 모집 공고 가져오기
export async function getAnnouncements(): Promise<ApiResponse<{ announcementInformMenus: Announcement[] }>> {
  return fetchWithISR('/home/announcement', 1)
}

// ✅ 추천 팀 가져오기
export async function getRecommendedTeams(): Promise<ApiResponse<{ teamInformMenus: TeamCard[] }>> {
  return fetchWithISR('/home/team', 1)
}

// ✅ 추천 팀원 가져오기
export async function getRecommendedTeamMembers(): Promise<ApiResponse<{ profileInformMenus: Profile[] }>> {
  return fetchWithISR('/home/profile', 1)
}
