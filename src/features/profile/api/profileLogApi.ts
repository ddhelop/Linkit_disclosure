import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export const deleteProfileLog = async (logId: number) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/${logId}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete log')
  return response
}

export const updateProfileLogType = async (logId: number, type: string) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/${logId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ logType: type }),
  })
  if (!response.ok) throw new Error('Failed to update log type')
  return response
}
