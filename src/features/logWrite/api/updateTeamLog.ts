import { fetchWithCSR } from '@/shared/api/fetchData'

export const updateTeamLog = async (
  teamName: string,
  logId: number,
  logData: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  },
) => {
  const res = (await fetchWithCSR(`/team/${teamName}/log/${logId}`, {
    method: 'PATCH',
    body: JSON.stringify(logData),
  })) as Response
  if (!res.ok) throw new Error('팀 로그 수정 실패')
  return res.json()
}
