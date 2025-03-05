import { Team } from '@/shared/types/TeamCardTypes'

// 검색 파라미터 타입 정의
export type FindTeamSearchParams = {
  scaleName: string[]
  cityName: string[]
  teamStateName: string[]
  size: number
  cursor?: string
}

// 무한 스크롤 응답 타입
export type InfiniteTeamResponse = {
  content: Team[]
  hasNext: boolean
  nextCursor?: string
}
