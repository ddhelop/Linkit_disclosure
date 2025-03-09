import { fetchWithSSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { ProfileDetail } from '@/shared/types/profile/ProfileDetailType'

// ✅ 내 프로필 상세조회
export async function getProfileDetail(emailId: string): Promise<ApiResponse<ProfileDetail>> {
  return fetchWithSSR(`/profile/${emailId}`)
}
