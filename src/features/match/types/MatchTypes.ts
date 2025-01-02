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
}

export interface ScrapResponse {
  isSuccess: boolean
  code: string
  message: string
  result: {
    profileInformMenus: ProfileInform[]
  }
}
