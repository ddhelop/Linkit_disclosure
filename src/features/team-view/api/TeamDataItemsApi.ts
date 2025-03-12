import { TeamLog } from '@/features/team/types/team.types'
import { fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'

// ✅ 팀 상세조회
export async function getTeamRepresentLog(teamName: string): Promise<ApiResponse<TeamLog>> {
  return fetchWithCSR(`/team/${teamName}/log/represent`)
}
