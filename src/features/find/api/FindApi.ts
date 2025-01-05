import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { ApiResponse, SearchParams, TeamSearchParams, TeamApiResponse } from '../types/FindTypes'

// 팀원 찾기 페이지 프로필 조회
export const getFindPrivateProfile = async (params: SearchParams): Promise<ApiResponse> => {
  // URLSearchParams 객체 생성
  const searchParams = new URLSearchParams()

  // 파라미터 추가
  if (params.majorPosition) {
    searchParams.append('majorPosition', params.majorPosition)
  }

  if (params.skillName && params.skillName.length > 0) {
    params.skillName.forEach((skill) => {
      searchParams.append('skillName', skill)
    })
  }

  if (params.cityName) {
    searchParams.append('cityName', params.cityName)
  }

  if (params.profileStateName) {
    searchParams.append('profileStateName', params.profileStateName)
  }

  // 페이지네이션 파라미터
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('size', String(params.size ?? 20))

  // API 호출
  const response = await fetchWithAuth(`/api/v1/profile/search?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch profiles')
  }

  return response.json()
}

// 팀 찾기 페이지 팀 조회
export const getFindTeam = async (params: TeamSearchParams): Promise<TeamApiResponse> => {
  const searchParams = new URLSearchParams()

  if (params.scaleName && params.scaleName.length > 0) {
    params.scaleName.forEach((scale) => {
      searchParams.append('scaleName', scale)
    })
  }

  if (params.isAnnouncement !== undefined) {
    searchParams.append('isAnnouncement', String(params.isAnnouncement))
  }

  if (params.cityName && params.cityName.length > 0) {
    params.cityName.forEach((city) => {
      searchParams.append('cityName', city)
    })
  }

  if (params.teamStateName && params.teamStateName.length > 0) {
    params.teamStateName.forEach((state) => {
      searchParams.append('teamStateName', state)
    })
  }

  searchParams.append('page', String(params.page ?? 0))
  searchParams.append('size', String(params.size ?? 20))

  const response = await fetchWithAuth(`/api/v1/team/search?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch teams')
  }

  return response.json()
}
