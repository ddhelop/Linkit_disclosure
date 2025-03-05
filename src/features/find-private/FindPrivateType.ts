// 검색 파라미터 타입 정의
export type SearchParams = {
  subPosition: string[]
  cityName: string[]
  profileStateName: string[]
  skillName: string[]
  size: number
  cursor?: string
}

// 무한 스크롤 응답 타입
export type InfiniteProfileResponse = {
  content: Profile[]
  hasNext: boolean
  nextCursor?: string
}
