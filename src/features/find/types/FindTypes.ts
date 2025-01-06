export interface SearchParams {
  majorPosition?: string
  skillName?: string[]
  cityName?: string
  profileStateName?: string
  page?: number
  size?: number
}

export interface ProfileState {
  profileStateName: string
}

export interface RegionDetail {
  cityName: string
  divisionName: string
}

export interface TeamInform {
  teamName: string
  teamLogoImagePath: string
}

export interface Profile {
  profileCurrentStates: ProfileState[]
  isProfileScrap: boolean
  profileImagePath: string
  memberName: string
  emailId: string
  isProfilePublic: boolean
  majorPosition: string
  regionDetail: RegionDetail
  profileTeamInforms: TeamInform[]
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface PageData {
  content: Profile[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  empty: boolean
}

export interface ApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: PageData
}

export interface TeamSearchParams {
  scaleName?: string[]
  isAnnouncement?: boolean
  cityName?: string[]
  teamStateName?: string[]
  page?: number
  size?: number
}

export interface TeamState {
  teamStateName: string
}

export interface TeamScale {
  teamScaleName: string
}

export interface Team {
  teamCode: string
  teamCurrentStates: TeamState[]
  isTeamScrap: boolean
  teamScrapCount: number
  teamName: string
  teamShortDescription: string
  teamLogoImagePath: string
  teamScaleItem: TeamScale
  regionDetail: RegionDetail
}

export interface TeamPageData {
  content: Team[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  empty: boolean
}

export interface TeamApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: TeamPageData
}
