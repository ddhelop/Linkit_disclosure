import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export const deleteProfileLog = async (logId: number) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/type/${logId}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete log')
  return response
}

export const updateProfileLogType = async (logId: number) => {
  const response = await fetchWithAuth(`/api/v1/profile/log/type/${logId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error('Failed to update log type')
  return response
}
