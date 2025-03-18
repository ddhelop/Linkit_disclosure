// src/app/(home)/api/homeApi.ts
import { fetchWithISR, fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'

import { FindTeamSearchParams } from '../../find-team/FindTeamType'
import { TeamCard, TeamData } from '@/features/team/types/team.types'

// ✅ 고정 프로필 데이터 가져오기
export async function getStaticFindTeamData(): Promise<ApiResponse<{ ventureTeams: TeamData[] }>> {
  return fetchWithISR('/team/search/featured', 1)
}

// 검색 파라미터로 프로필 데이터 가져오기 (무한 스크롤용)
export async function getFindTeamProfile(
  params: FindTeamSearchParams,
): Promise<ApiResponse<{ content: TeamCard[]; hasNext: boolean; nextCursor?: string }>> {
  // URL 파라미터 구성
  const queryParams = new URLSearchParams()

  params.scaleName.forEach((pos) => queryParams.append('scaleName', pos))
  params.cityName.forEach((city) => queryParams.append('cityName', city))
  params.teamStateName.forEach((state) => queryParams.append('teamStateName', state))

  if (params.cursor) {
    queryParams.append('cursor', params.cursor)
  }

  queryParams.append('size', params.size.toString())

  // CSR 방식으로 데이터 가져오기
  return fetchWithCSR(`/team/search?${queryParams.toString()}`)
}
