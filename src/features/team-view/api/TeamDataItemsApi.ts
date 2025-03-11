import { fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'

import { TeamLog } from '@/shared/types/TeamType'

// ✅ 팀 상세조회
export async function getTeamRepresentLog(teamName: string): Promise<ApiResponse<TeamLog>> {
  return fetchWithCSR(`/team/${teamName}/log/represent`)
}
