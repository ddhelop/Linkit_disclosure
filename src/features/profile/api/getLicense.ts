import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

export interface License {
  profileLicenseId: number
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  licenseDescription: string
  isLicenseCertified: boolean
  isLicenseVerified: boolean
  licenseCertificationAttachFileName: string
  licenseCertificationAttachFilePath: string
}

interface LicenseResponse {
  isSuccess: boolean
  code: string
  message: string
  result: License
}

export const getLicense = async (id: string): Promise<License> => {
  const response = await fetchWithAuth(`/api/v1/profile/license/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch license')
  }

  const data: LicenseResponse = await response.json()
  return data.result
}
