export type ProfileCompletionMenuType = {
  profileCompletion: number
}

export type ProfileStateType = {
  profileStateName: string
}

export type RegionDetailType = {
  cityName: string
  divisionName: string
}

export type ProfileInformMenuType = {
  profileCurrentStates: ProfileStateType[]
  profileImagePath: string
  memberName: string
  isProfilePublic: boolean
  majorPosition: string
  regionDetail: RegionDetailType
}

export type ProfileBooleanMenuType = {
  isMiniProfile: boolean
  isProfileSkill: boolean
  isProfileActivity: boolean
  isProfilePortfolio: boolean
  isProfileEducation: boolean
  isProfileAwards: boolean
  isProfileLicense: boolean
  isProfileLink: boolean
}

export type ResultType = {
  profileCompletionMenu: ProfileCompletionMenuType
  profileInformMenu: ProfileInformMenuType
  profileBooleanMenu: ProfileBooleanMenuType
}

export type ApiResponseType = {
  isSuccess: boolean
  code: string
  message: string
  result: ResultType
}
