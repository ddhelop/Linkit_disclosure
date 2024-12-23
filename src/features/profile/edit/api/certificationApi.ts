import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

// 인증 요청 API
export const requestCertification = async (id: string, file: File, apiEndpoint: string) => {
  const formData = new FormData()
  formData.append(`profile${apiEndpoint}CertificationFile`, file)

  const response = await fetchWithAuth(`/api/v1/profile/${apiEndpoint.toLowerCase()}/certification/${id}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload certification')
  }

  return await response.json()
}

// 인증 삭제
export async function deleteCertification(activityId: string): Promise<void> {
  const response = await fetchWithAuth(`/api/v1/profile/activity/certification/${activityId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete certification. Status: ${response.status}`)
  }
}
