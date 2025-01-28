import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export async function getMyProfileBasicInform() {
  const response = await fetchWithAuth(`/api/v1/member/basic-inform`, {
    method: 'GET',
  })
  if (!response.ok) {
    throw new Error('Failed to fetch profile information')
  }
  return response.json()
}
