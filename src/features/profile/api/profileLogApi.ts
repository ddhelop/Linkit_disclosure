import { fetchWithCSR } from '@/shared/api/fetchData'
import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { ProfileLogDetailType } from '../types/profile.type'

// GET
// 프로필 로그 상세 조회
export const getProfileLogDetail = async (profileLogId: number): Promise<ApiResponse<ProfileLogDetailType>> => {
  return fetchWithCSR(`/profile/log/view/detail/${profileLogId}`, {
    cache: 'no-store',
  })
}

export const deleteProfileLog = async (logId: number) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/${logId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    return response.json()
  }

  return response.json()
}

export const updateProfileLogType = async (logId: number) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/type/${logId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error('Failed to update log type')
  return response
}

// 비공개 공개 업데이트
export const updateProfileLogPublic = async (logId: number) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/state/${logId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error('Failed to update log public')
  return response.json()
}

// 프로필 로그 리스트 조회
export const getProfileLogs = async (emailId: string) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/view/${emailId}`, {
    method: 'GET',
  })
  if (!response.ok) throw new Error('Failed to get profile logs')
  return response.json()
}
