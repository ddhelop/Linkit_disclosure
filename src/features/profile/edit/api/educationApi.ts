import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface EducationRequest {
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  isAttendUniversity: boolean
  educationDescription: string
}

export const createEducation = async (educationData: EducationRequest) => {
  try {
    const response = await fetchWithAuth('/api/v1/profile/education', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(educationData),
    })

    if (!response.ok) {
      throw new Error('Failed to create education')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating education:', error)
    throw error
  }
}
