/** 팀 상태 정보 */
export interface TeamState {
  teamStateName: string // 예: "투자 유치 중", "공모전 준비 중"
}

/** 팀 규모 정보 */
export interface TeamScale {
  teamScaleName: string // 예: "1인", "2~5인"
}

/** 활동 지역 정보 */
export interface RegionDetail {
  cityName: string
  divisionName: string
}

/** 팀 정보 */
export interface TeamCard {
  teamCurrentStates: TeamState[]
  isTeamScrap?: boolean
  teamScrapCount?: number
  teamName: string
  teamCode: string
  teamShortDescription: string
  teamLogoImagePath: string
  teamScaleItem: TeamScale
  regionDetail: RegionDetail
}

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

export interface TeamLog {
  teamLogId: number
  isLogPublic: boolean
  logType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  modifiedAt: string
  logTitle: string
  logContent: string
}

export interface TeamLog {}
