import { fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { ProfileDetail, ProfileInformMenu, ProfileVisitor } from '@/shared/types/profile/ProfileDetailType'

// ✅ 내 프로필 상세조회
export async function getProfileDetail(emailId: string): Promise<ApiResponse<ProfileDetail>> {
  return fetchWithCSR(`/profile/${emailId}`, {
    cache: 'no-store',
  })
}

// ✅ 프로필 방문자 목록 조회
export async function getProfileVisitors(): Promise<ApiResponse<{ visitInforms: ProfileVisitor[] }>> {
  return fetchWithCSR(`/profile/visit`)
}
