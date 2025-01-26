import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

// 알림 목록 전체 조회
export async function getNotificationList() {
  const response = await fetchWithAuth('/api/v1/notifications', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch notification list')
  }

  return response.json()
}

export const readNotification = async (notificationId: string) => {
  const response = await fetchWithAuth(`/api/v1/notification/read/${notificationId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to mark notification as read')
  }

  return response.json()
}
