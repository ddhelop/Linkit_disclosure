import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ProfileData } from '../../model/types'

export async function fetchProfileData(): Promise<ProfileData> {
  const response = await fetchWithAuth('/api/v1/miniProfile')

  if (!response.ok) {
    throw new Error('프로필 데이터를 불러오는데 실패했습니다.')
  }

  const data = await response.json()
  return data.result
}

export async function updateProfile(profileId: number, formData: FormData): Promise<void> {
  const response = await fetchWithAuth(`/api/v1/miniProfile/${profileId}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '프로필 수정에 실패했습니다.')
  }
}
