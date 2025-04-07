import { fetchWithCSR } from '@/shared/api/fetchData'
import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export const updateProfileLog = async (
  logId: string,
  logData: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  },
) => {
  const res = await fetchWithAuth(`/api/v1/profile/log/${logId}`, {
    method: 'POST',
    body: JSON.stringify(logData),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
  if (!res.ok) throw new Error('프로필 로그 수정 실패')
  return res.json()
}
