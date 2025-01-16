import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export const getAnnouncement = async () => {
  try {
    const response = await fetchWithAuth('/api/v1/home/announcement')
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
