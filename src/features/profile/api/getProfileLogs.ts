import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { ProfileLogDetailType } from '../types/profile.type'

interface ProfileLogsResponse {
  profileLogItems: ProfileLogDetailType[]
}

export const getProfileLogs = async (): Promise<ApiResponse<ProfileLogsResponse>> => {
  const response = await fetchWithAuth('/api/v1/profile/log')

  if (!response.ok) {
    throw new Error('Failed to fetch profile logs')
  }

  return await response.json()
}

interface ProfileLogDetail {
  profileLogId: number
  isLogPublic: boolean
  logType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  modifiedAt: string
  logTitle: string
  logContent: string
}

export const getProfileLog = async (id: number): Promise<ProfileLogDetail> => {
  const response = await fetchWithAuth(`/api/v1/profile/log/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch profile log')
  }

  const data = await response.json()
  return data.result
}
