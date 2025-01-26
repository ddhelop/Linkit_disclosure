interface ProfileUpdateData {
  majorPosition: string
  subPosition: string
  cityName: string
  divisionName: string
  profileStateNames: string[]
  isProfilePublic: boolean
}

export function validateImageFile(file: File): boolean {
  const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (file.size > maxSize) {
    alert('파일 크기는 10MB 이하여야 합니다.')
    return false
  }

  if (!validTypes.includes(file.type)) {
    alert('PNG, JPG, GIF, SVG 파일만 업로드 가능합니다.')
    return false
  }

  return true
}

export function createProfileFormData(profileImage: File | null, profileData: ProfileUpdateData): FormData {
  const formData = new FormData()

  if (profileImage) {
    formData.append('profileImage', profileImage)
  }

  formData.append('updateMiniProfileRequest', new Blob([JSON.stringify(profileData)], { type: 'application/json' }))

  return formData
}
