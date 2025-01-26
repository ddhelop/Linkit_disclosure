import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface EducationRequest {
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  isAttendUniversity: boolean
  educationDescription: string
}

// 교육 정보 조회
export const getEducationById = async (id: string) => {
  try {
    const response = await fetchWithAuth(`/api/v1/profile/education/${id}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch education')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching education:', error)
    throw error
  }
}

// 교육 정보 생성
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

// 교육 정보 수정
export const updateEducation = async (id: string, educationData: EducationRequest) => {
  try {
    const response = await fetchWithAuth(`/api/v1/profile/education/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(educationData),
    })

    if (!response.ok) {
      throw new Error('Failed to update education')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating education:', error)
    throw error
  }
}

// 교육 정보 삭제 API 추가
export const deleteEducation = async (id: number) => {
  try {
    const response = await fetchWithAuth(`/api/v1/profile/education/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete education')
    }

    return await response.json()
  } catch (error) {
    console.error('Error deleting education:', error)
    throw error
  }
}
