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
