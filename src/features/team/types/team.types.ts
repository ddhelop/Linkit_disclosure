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

export interface TeamInfoResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    isMyTeam: boolean

    teamInformMenu: {
      teamCode: string
      teamScrapCount: number
      isTeamScrap: boolean
      teamCurrentStates: Array<{ teamStateName: string }>
      teamName: string
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
