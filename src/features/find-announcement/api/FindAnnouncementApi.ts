// src/app/(home)/api/homeApi.ts
import { fetchWithISR, fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { FindAnnouncementSearchParams } from '../FindAnnouncementType'
import { Announcement } from '@/features/team/types/team.types'

// ✅ 고정 프로필 데이터 가져오기
export async function getStaticFindAnnouncementData(): Promise<ApiResponse<{ hotAnnouncements: Announcement[] }>> {
  return fetchWithCSR('/announcement/search/featured', {
    cache: 'no-store',
  })
}

// 검색 파라미터로 프로필 데이터 가져오기 (무한 스크롤용)
export async function getFindAnnouncementProfile(
  params: FindAnnouncementSearchParams,
): Promise<ApiResponse<{ content: Announcement[]; hasNext: boolean; nextCursor?: string }>> {
  // URL 파라미터 구성
  const queryParams = new URLSearchParams()

  params.subPosition.forEach((pos) => queryParams.append('subPosition', pos))
  params.cityName.forEach((city) => queryParams.append('cityName', city))
  params.scaleName.forEach((state) => queryParams.append('scaleName', state))
  params.projectType.forEach((type) => queryParams.append('projectType', type))

  if (params.cursor) {
    queryParams.append('cursor', params.cursor.toString())
  }

  queryParams.append('size', params.size.toString())

  // CSR 방식으로 데이터 가져오기
  return fetchWithCSR(`/announcement/search?${queryParams.toString()}`)
}
