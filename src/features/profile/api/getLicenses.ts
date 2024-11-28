import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface License {
  profileLicenseId: number
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  isLicenseVerified: boolean
}

interface LicenseResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    profileLicenseItems: License[]
  }
}

export const getLicenses = async (): Promise<License[]> => {
  const response = await fetchWithAuth('/api/v1/profile/license')

  if (!response.ok) {
    throw new Error('Failed to fetch licenses')
  }

  const data: LicenseResponse = await response.json()
  return data.result.profileLicenseItems
}
