import { fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'
import { TeamHistory } from '../types/teamHistory.types'

// 팀 연혁 단일 조회
export const getTeamSingleHistory = async (teamName: string, id: number): Promise<ApiResponse<TeamHistory>> => {
  return fetchWithCSR(`/team/${teamName}/history/${id}`, {
    cache: 'no-store',
  })
}
