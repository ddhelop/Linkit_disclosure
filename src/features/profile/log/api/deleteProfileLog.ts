import { fetchWithCSR } from '@/shared/api/fetchData'

export const deleteProfileLog = async (logId: number) => {
  return fetchWithCSR(`/profile/log/${logId}`, {
    method: 'DELETE',
  })
}
