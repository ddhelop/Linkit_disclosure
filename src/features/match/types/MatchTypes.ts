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

export interface ProfileInform {
  profileCurrentStates: ProfileState[]
  isProfileScrap: boolean
  profileImagePath: string
  memberName: string
  emailId: string
  isProfilePublic: boolean
  majorPosition: string
  regionDetail: RegionDetail
  profileTeamInforms: TeamInform[]
  profileScrapCount: number
}

export interface ScrapResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    profileInformMenus: ProfileInform[]
  }
}

export interface TeamState {
  teamStateName: string
}

export interface TeamScaleItem {
  teamScaleName: string
}

export interface TeamInformMenu {
  teamCurrentStates: TeamState[]
  isTeamScrap: boolean
  teamScrapCount: number
  teamName: string
  teamShortDescription: string
  teamLogoImagePath: string
  teamScaleItem: TeamScaleItem
  regionDetail: RegionDetail
  teamCode: string
}

export interface AnnouncementScrapResponse {
  teamLogoImagePath: string
  teamName: string
  teamCode: string
  teamScaleItem: {
    teamScaleName: string
  }
  regionDetail: RegionDetail
  announcementDDay: number
  announcementTitle: string
  isAnnouncementScrap: boolean
  announcementScrapCount: number
  announcementPositionItem: PositionDetail
  announcementSkillNames: AnnouncementSkill[]
}

export interface TeamScrapResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    teamInformMenus: TeamInformMenu[]
  }
}

export interface PositionDetail {
  majorPosition: string
  subPosition: string
}

export interface ProfileInformation {
  profileImagePath: string
  memberName: string
  emailId: string
  profilePositionDetail: PositionDetail
}

export interface TeamInformation {
  teamCode: string
  teamName: string
  teamLogoImagePath: string
  teamScaleItem: {
    teamScaleName: string
  }
}

export interface AnnouncementSkill {
  announcementSkillName: string
}

export interface AnnouncementInformation {
  announcementTitle: string
  announcementPositionItem: PositionDetail
  announcementSkillNames: AnnouncementSkill[]
}

export interface MatchingMessage {
  matchingId: number
  senderType: 'PROFILE' | 'TEAM'
  receiverType: 'PROFILE' | 'TEAM'
  senderProfileInformation: ProfileInformation
  senderTeamInformation: TeamInformation
  receiverProfileInformation: ProfileInformation
  receiverTeamInformation: TeamInformation
  receiverAnnouncementInformation: AnnouncementInformation
  requestMessage: string
  matchingStatusType: 'REQUESTED' | 'COMPLETED'
  receiverReadStatus: 'UNREAD_REQUESTED_MATCHING' | 'READ_COMPLETED_MATCHING'
}

export interface MatchingResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    content: MatchingMessage[]
    totalElements: number
    totalPages: number
    size: number
    number: number
  }
}

export interface MatchingMenuResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    content: MatchingMessage[]
    pageable: {
      pageNumber: number
      pageSize: number
      sort: {
        empty: boolean
        unsorted: boolean
        sorted: boolean
      }
      offset: number
      paged: boolean
      unpaged: boolean
    }
    last: boolean
    totalElements: number
    totalPages: number
    first: boolean
    size: number
    number: number
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    numberOfElements: number
    empty: boolean
  }
}

export type ReceiverType = 'PROFILE' | 'TEAM' | undefined

export type FilterType = 'MEMBER' | 'TEAM' | 'ANNOUNCEMENT'
