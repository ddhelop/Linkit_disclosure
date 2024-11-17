import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

// 인증 요청 API
export const requestCertification = async (activityId: string, selectedFile: File) => {
  const formData = new FormData()
  formData.append('profileActivityCertificationFile', selectedFile)

  const url = `/api/v1/profile/activity/certification/${activityId}`
  const response = await fetchWithAuth(url, {
    method: 'POST',
    body: formData, // FormData 추가
    credentials: 'include', // 쿠키 포함
  })

  if (!response.ok) {
    throw new Error('Failed to request certification')
  }

  return response.json()
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
