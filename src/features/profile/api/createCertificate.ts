import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface CreateCertificateRequest {
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  licenseDescription?: string
}

export const createCertificate = async (data: CreateCertificateRequest) => {
  const response = await fetchWithAuth('/api/v1/profile/license', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create certificate')
  }

  return response.json()
}
