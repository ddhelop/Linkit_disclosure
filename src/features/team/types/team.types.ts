// 팀 카드 정보
export interface TeamCard {
  teamCurrentStates: {
    teamStateName: string
  }
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

  teamInformMenu: {
    teamCode: string

    isTeamScrap: boolean
    isTeamMatching: boolean
    teamCurrentStates: Array<{ teamStateName: string }>
    teamName: string
    teamShortDescription: string
    teamLogoImagePath: string
    teamScaleItem: {
      teamScaleName: string
    }
    teamScrapCount: number
    regionDetail: {
      cityName: string
      divisionName: string
    }
  }
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
  subPosition: string
  announcementScrapCount: number
  announcementDDay: number
  isPermanentRecruitment: boolean
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
    cityName: string | null
    divisionName: string | null
  }
  teamMemberType: string
  teamMemberInviteState: string
}
