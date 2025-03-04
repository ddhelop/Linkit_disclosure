// src/app/(home)/api/homeApi.ts
import { fetchWithISR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { Profile } from '@/shared/types/ProfileCardTypes'

// ✅ 고정 프로필 데이터 가져오기
export async function getStaticFindPrivateData(): Promise<ApiResponse<{ topCompletionProfiles: Profile[] }>> {
  return fetchWithISR('/profile/search/featured', 1)
}
