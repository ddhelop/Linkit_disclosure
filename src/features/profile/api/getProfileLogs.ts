import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export interface ProfileLogItem {
  profileLogId: number
  isLogPublic: boolean
  profileLogType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  modifiedAt: string
  logTitle: string
  logContent: string
}

interface ProfileLogsResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    profileLogItems: ProfileLogItem[]
  }
}

export const getProfileLogs = async (): Promise<ProfileLogItem[]> => {
  const response = await fetchWithAuth('/api/v1/profile/log')

  if (!response.ok) {
    throw new Error('Failed to fetch profile logs')
  }

  const data: ProfileLogsResponse = await response.json()
  return data.result.profileLogItems
}
