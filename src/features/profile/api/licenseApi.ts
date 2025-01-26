import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface LicenseData {
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  licenseDescription: string
}

// 자격증 생성
export const createLicense = async (licenseData: LicenseData) => {
  const response = await fetchWithAuth('/api/v1/profile/license', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(licenseData),
  })

  if (!response.ok) {
    throw new Error('Failed to create license')
  }

  return response.json()
}

// 자격증 수정
export const updateLicense = async (id: string, licenseData: LicenseData) => {
  const response = await fetchWithAuth(`/api/v1/profile/license/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(licenseData),
  })

  if (!response.ok) {
    throw new Error('Failed to update license')
  }

  return response.json()
}

// 자격증 삭제
export const deleteLicense = async (id: number) => {
  const response = await fetchWithAuth(`/api/v1/profile/license/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete license')
  }
}
