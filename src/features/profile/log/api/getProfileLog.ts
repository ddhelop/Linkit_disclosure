import { fetchWithCSR, fetchWithSSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { ProfileLogDetailType } from '../types'

// SSR
// 프로필 로그 리스트 조회
export const getProfileLogs = async (
  emailId: string,
): Promise<ApiResponse<{ profileLogItems: ProfileLogDetailType[] }>> => {
  return fetchWithSSR(`/profile/log/view/${emailId}`)
}

// CSR
export const getProfileLogDetail = async (profileLogId: number): Promise<ApiResponse<ProfileLogDetailType>> => {
  return fetchWithCSR(`/profile/log/view/detail/${profileLogId}`)
}

// 내 프로필 로그 조회
export const getMyProfileLogs = async (): Promise<ApiResponse<{ profileLogItems: ProfileLogDetailType[] }>> => {
  return fetchWithCSR(`/profile/log`)
}
