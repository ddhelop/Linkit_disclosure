// src/app/(home)/api/homeApi.ts
import { fetchData } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { LogCardType } from '@/shared/types/LogCardTypes'
import { Announcement } from '@/shared/types/AnnouncementTypes'
import { Team } from '@/shared/types/TeamCardTypes'
import { Profile } from '@/shared/types/ProfileCardTypes'

// ✅ 인기 로그 가져오기
export async function getPopularLog(): Promise<ApiResponse<{ logInformMenus: LogCardType[] }>> {
  return fetchData('/home/logs')
}

// ✅ 모집 공고 가져오기
export async function getAnnouncements(): Promise<ApiResponse<{ announcementInformMenus: Announcement[] }>> {
  return fetchData('/home/announcement')
}

// ✅ 추천 팀 가져오기
export async function getRecommendedTeams(): Promise<ApiResponse<{ teamInformMenus: Team[] }>> {
  return fetchData('/home/team')
}

// ✅ 추천 팀원 가져오기
export async function getRecommendedTeamMembers(): Promise<ApiResponse<{ profileInformMenus: Profile[] }>> {
  return fetchData('/home/profile')
}
