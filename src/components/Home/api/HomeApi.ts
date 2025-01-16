import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

// 홈화면 - 모집 공고
export const getAnnouncement = async () => {
  try {
    const response = await fetchWithAuth('/api/v1/home/announcement')
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 홈화면 - 팀 추천
export const getTeamRecommend = async () => {
  try {
    const response = await fetchWithAuth('/api/v1/home/team')
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 홈화면 - 팀원 추천
export const getTeamMemberRecommend = async () => {
  try {
    const response = await fetchWithAuth('/api/v1/home/profile')
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
