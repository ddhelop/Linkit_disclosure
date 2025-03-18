// 팀 카드 정보
export interface TeamCard {
  teamCurrentStates: Array<{ teamStateName: string }>
  isTeamScrap?: boolean
  teamScrapCount?: number
  teamName: string
  teamCode: string
  teamShortDescription: string
  teamLogoImagePath: string
  teamScaleItem: {
    teamScaleName: string
  }
  regionDetail: {
    cityName: string
    divisionName: string
  }
}

// 팀 정보
export interface TeamData {
  isMyTeam: boolean
  isTeamManager: boolean
  isTeamDeleteInProgress: boolean
  isTeamInvitationInProgress: boolean
  isTeamDeleteRequester: boolean
  teamInformMenu: TeamCard
}

// 팀 로그
export interface TeamLog {
  teamLogId: number
  isLogPublic: boolean
  logType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  modifiedAt: string
  logTitle: string
  logContent: string
}

// 모집공고
export interface Announcement {
  teamMemberAnnouncementId: number
  isAnnouncementScrap: boolean
  majorPosition: string
  viewCount: number
  createdAt: string
  subPosition: string
  announcementScrapCount: number
  announcementDDay: number
  isPermanentRecruitment: boolean
  isAnnouncementPublic: boolean
  isAnnouncementInProgress: boolean
  announcementTitle: string
  announcementPositionItem: {
    majorPosition: string
    subPosition: string
  }
  announcementSkillNames: {
    announcementSkillName: string
  }[]
  announcementEndDate?: string
  isRegionFlexible?: boolean
  mainTasks?: string
  workMethod?: string
  idealCandidate?: string
  preferredQualifications?: string
  joiningProcess?: string
  benefits?: string

  teamName?: string
  teamLogoImagePath?: string
  teamCode?: string
  isClosed?: boolean
}

// 팀 멤버
export interface TeamMember {
  emailId: string
  profileImagePath: string
  memberName: string
  majorPosition: string
  regionDetail: {
    cityName: string
    divisionName: string
  }
  teamMemberType: string
  teamMemberInviteState: string
}

// 팀 프로덕트
export interface TeamProductView {
  teamProductId: number
  productName: string
  productLineDescription: string
  productField: string
  productStartDate: string
  productEndDate: string
  isProductInProgress: boolean
  teamProductLinks: {
    productLinkId: number
    productLinkName: string
    productLinkPath: string
  }[]
  productDescription: string
  productRepresentImagePath: string
  productSubImages: {
    productSubImagePath: string
  }[]
  teamProductImages: {
    productRepresentImagePath: string
    productSubImages: {
      productSubImagePath: string
    }[]
  }
}

// 팀 연혁
export interface TeamHistory {
  teamHistoryId: number
  historyName: string
  historyStartDate: string
  historyEndDate: string | null
  isHistoryInProgress: boolean
}
