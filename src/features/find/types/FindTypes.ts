export interface SearchParams {
  subPosition?: string[]
  cityName?: string[]
  scaleName?: string[]
  profileStateName?: string[]

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

export interface Profile {
  profileCurrentStates: ProfileState[]
  isProfileScrap: boolean
  profileImagePath: string
  memberName: string
  emailId: string
  isProfilePublic: boolean
  majorPosition: string
  regionDetail: RegionDetail
  profileScrapCount: number
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
  topCompletionProfiles: Profile[]
  defaultProfiles: {
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
}

export interface ApiResponse<T = Profile> {
  isSuccess: boolean
  code: string
  message: string
  result: T extends Profile ? PageData : AnnouncementPageData
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
  teamScaleName: string | string[]
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
  ventureTeams: Team[]
  supportProjectTeams: Team[]
  defaultTeams: {
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
}

export interface TeamApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: TeamPageData
}

interface AnnouncementPositionItem {
  majorPosition: string
  subPosition: string
}

interface AnnouncementSkillName {
  announcementSkillName: string
}

export interface Announcement {
  teamMemberAnnouncementId: number
  teamLogoImagePath: string
  teamName: string
  teamCode: string
  teamScaleItem: TeamScale
  regionDetail: RegionDetail
  isClosed: boolean
  announcementDDay: number
  announcementTitle: string
  isAnnouncementScrap: boolean
  announcementScrapCount: number
  isPermanentRecruitment: boolean
  announcementPositionItem: AnnouncementPositionItem
  announcementSkillNames: AnnouncementSkillName[]
}

export interface AnnouncementPageData {
  hotAnnouncements: Announcement[]
  defaultAnnouncements: {
    content: Announcement[]
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
}

export interface AnnouncementApiResponse {
  isSuccess: boolean
  code: string
  message: string
  result: AnnouncementPageData
}
