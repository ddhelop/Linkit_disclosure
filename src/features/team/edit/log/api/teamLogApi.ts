import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export interface TeamLogItem {
  teamLogId: number
  isLogPublic: boolean
  logType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  modifiedAt: string
  logTitle: string
  logContent: string
}

export interface TeamLogResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    teamLogItems: TeamLogItem[]
  }
}

export const getTeamLogs = async () => {
  const response = await fetchWithAuth('/api/v1/team/liaison/log')
  if (!response.ok) {
    throw new Error('Failed to fetch team logs')
  }
  return response.json() as Promise<TeamLogResponse>
}
