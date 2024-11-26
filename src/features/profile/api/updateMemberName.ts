import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface UpdateMemberNameResponse {
  success: boolean
  message?: string
}

export const updateMemberName = async (memberName: string): Promise<UpdateMemberNameResponse> => {
  const response = await fetchWithAuth('/api/v1/member/name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ memberName }),
  })

  if (!response.ok) {
    throw new Error('Failed to update member name')
  }

  return response.json()
}
