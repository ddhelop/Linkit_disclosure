import { Announcement } from '@/shared/types/AnnouncementTypes'

// 검색 파라미터 타입 정의
export type FindAnnouncementSearchParams = {
  subPosition: string[]
  cityName: string[]
  scaleName: string[]
  size: number
  cursor?: number
}

// 무한 스크롤 응답 타입
export type InfiniteAnnouncementResponse = {
  content: Announcement[]
  hasNext: boolean
  nextCursor?: string
}
