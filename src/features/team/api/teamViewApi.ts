import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

// 팀 로그 상세 페이지 조회
export async function getTeamLogDetail(teamName: string, logId: number) {
  const response = await fetchWithAuth(`/api/v1/team/${teamName}/log/${logId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch team log detail')
  }
  return response.json()
}
