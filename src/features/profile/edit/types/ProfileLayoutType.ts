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

export type TeamInformType = {
  teamName: string
  teamCode: string
  teamLogoImagePath: string
}

export type ProfileLogItemType = {
  profileLogId: number
  isLogPublic: boolean
  logType: string
  modifiedAt: string
  logTitle: string
  logContent: string
}

export type ProfileSkillItemType = {
  profileSkillId: number
  skillName: string
  skillLevel: string
}

export type ProfileActivityItemType = {
  profileActivityId: number
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string
  isActivityVerified: boolean
  activityDescription: string
}

export type ProfilePortfolioItemType = {
  profilePortfolioId: number
  projectName: string
  projectLineDescription: string
  projectSize: 'PERSONAL' | 'TEAM'
  projectStartDate: string
  projectEndDate: string
  isProjectInProgress: boolean
  projectRoles: string[]
  projectRepresentImagePath: string
}

export type ProfileEducationItemType = {
  profileEducationId: number
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  isAttendUniversity: boolean
  isEducationVerified: boolean
  educationDescription: string
}

export type ProfileAwardsItemType = {
  profileAwardsId: number
  awardsName: string
  awardsRanking: string
  awardsDate: string
  isAwardsVerified: boolean
  awardsDescription: string
}

export type ProfileLicenseItemType = {
  profileLicenseId: number
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  isLicenseVerified: boolean
  licenseDescription: string
}

export type ProfileLinkItemType = {
  profileLinkId: number
  linkName: string
  linkPath: string
}

export type ProfileInformMenuType = {
  profileCurrentStates: ProfileStateType[]
  isProfileScrap: boolean
  profileScrapCount: number
  profileImagePath: string
  memberName: string
  emailId: string
  isProfilePublic: boolean
  majorPosition: string
  regionDetail: RegionDetailType
  profileTeamInforms: TeamInformType[]
}

export type ProfileLayoutType = {
  isMyProfile: boolean
  profileCompletionMenu: {
    profileCompletion: number
  }
  profileInformMenu: ProfileInformMenuType
  profileScrapCount: number
  profileLogItem: ProfileLogItemType
  profileSkillItems: ProfileSkillItemType[]
  profileActivityItems: ProfileActivityItemType[]
  profilePortfolioItems: ProfilePortfolioItemType[]
  profileEducationItems: ProfileEducationItemType[]
  profileAwardsItems: ProfileAwardsItemType[]
  profileLicenseItems: ProfileLicenseItemType[]
  profileLinkItems: ProfileLinkItemType[]
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
