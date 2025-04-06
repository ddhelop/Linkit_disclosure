import { fetchWithCSR } from '@/shared/api/fetchData'

export const createTeamLog = async (
  teamName: string,
  logData: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  },
) => {
  const res = (await fetchWithCSR(`/team/${teamName}/log`, {
    method: 'POST',
    body: JSON.stringify(logData),
  })) as Response
  if (!res.ok) throw new Error('팀 로그 생성 실패')
  return res.json()
}
