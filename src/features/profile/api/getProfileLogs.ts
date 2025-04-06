import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ProfileLogDetailType } from '../log/types'

export const getProfileLog = async (id: number): Promise<ProfileLogDetailType> => {
  const response = await fetchWithAuth(`/api/v1/profile/log/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch profile log')
  }

  const data = await response.json()
  return data.result
}
