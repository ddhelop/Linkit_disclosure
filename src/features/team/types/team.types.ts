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
