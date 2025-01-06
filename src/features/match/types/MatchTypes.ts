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
}

export interface TeamScrapResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    teamInformMenus: TeamInformMenu[]
  }
}
