import { fetchWithCSR } from '@/shared/api/fetchData'

export const updateProfileLog = async (
  logId: string,
  logData: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  },
) => {
  const res = (await fetchWithCSR(`/profile/log/${logId}`, {
    method: 'PATCH',
    body: JSON.stringify(logData),
  })) as Response
  if (!res.ok) throw new Error('프로필 로그 수정 실패')
  return res.json()
}
