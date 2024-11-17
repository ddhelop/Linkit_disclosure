'use client'
import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface ActivityData {
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string | null
  isActivityInProgress: boolean
  activityDescription: string
}

export const addActivity = async (activityData: ActivityData): Promise<Response> => {
  const url = '/api/v1/profile/activity'

  return await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(activityData),
  })
}

// 이력 전체 조회
export const getActivities = async () => {
  const url = '/api/v1/profile/activity'
  const response = await fetchWithAuth(url, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch activities')
  }

  const data = await response.json()
  return data.result.profileActivityItems
}
