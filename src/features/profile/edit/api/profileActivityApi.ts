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

export const saveActivity = async (activityData: ActivityData) => {
  const response = await fetchWithAuth('/api/v1/profile/activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activityData),
  })

  if (!response.ok) {
    throw new Error('Failed to save activity')
  }

  return response.json()
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

// 이력 상세 조회
export const getActivityById = async (id: string) => {
  const url = `/api/v1/profile/activity/${id}`
  const response = await fetchWithAuth(url, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch activity with ID ${id}`)
  }

  const data = await response.json()
  return data.result
}

export const deleteActivity = async (id: number): Promise<void> => {
  await fetchWithAuth(`/api/v1/profile/activity/${id}`, {
    method: 'DELETE',
  })
}
