import { fetchWithCSR } from '@/shared/api/fetchData'
import { ApiResponse } from '@/shared/types/ApiResponse'

import { TeamData } from '@/shared/types/TeamType'

// ✅ 팀 상세조회
export async function getTeamDetail(teamName: string): Promise<ApiResponse<TeamData>> {
  return fetchWithCSR(`/team/${teamName}`)
}
