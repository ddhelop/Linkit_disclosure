// src/app/(home)/api/homeApi.ts
import { fetchWithISR, fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { Profile } from '@/shared/types/ProfileCardTypes'
import { SearchParams } from '../FindPrivateType'

// ✅ 고정 프로필 데이터 가져오기
export async function getStaticFindPrivateData(): Promise<ApiResponse<{ topCompletionProfiles: Profile[] }>> {
  return fetchWithISR('/profile/search/featured', 1)
}

// 검색 파라미터로 프로필 데이터 가져오기 (무한 스크롤용)
export async function getFindPrivateProfile(
  params: SearchParams,
): Promise<ApiResponse<{ content: Profile[]; hasNext: boolean; nextCursor?: string }>> {
  // URL 파라미터 구성
  const queryParams = new URLSearchParams()

  params.subPosition.forEach((pos) => queryParams.append('subPosition', pos))
  params.cityName.forEach((city) => queryParams.append('cityName', city))
  params.profileStateName.forEach((state) => queryParams.append('profileStateName', state))
  params.skillName.forEach((skill) => queryParams.append('skillName', skill))

  if (params.cursor) {
    queryParams.append('cursor', params.cursor)
  }

  queryParams.append('size', params.size.toString())

  // CSR 방식으로 데이터 가져오기
  return fetchWithCSR(`/profile/search?${queryParams.toString()}`)
}
