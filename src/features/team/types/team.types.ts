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

export interface TeamState {
  teamStateName: string
}

export interface TeamScale {
  teamScaleName: string
}

export interface RegionDetail {
  cityName: string
  divisionName: string
}

export interface TeamInformation {
  teamCurrentStates: TeamState[]
  teamName: string
  teamShortDescription: string
  teamLogoImagePath: string
  teamScaleItem: TeamScale
  regionDetail: RegionDetail
  teamCode: string
}

export interface TeamResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    teamInformMenus: TeamInformation[]
  }
}

export interface TeamLogItem {
  teamLogId: number
  isLogPublic: boolean
  logType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  modifiedAt: string
  logTitle: string
  logContent: string
}

export interface TeamLogsResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    teamLogItems: TeamLogItem[]
  }
}

export interface TeamHistory {
  teamHistoryId: number
  historyName: string
  historyStartDate: string
  historyEndDate: string
  isHistoryInProgress: boolean
}
