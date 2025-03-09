// 기본 프로필 정보
export type ProfileInformMenu = {
  isProfilePublic: boolean
  profileCurrentStates: { profileStateName: string }[]
  isProfileScrap: boolean
  profileScrapCount: number
  profileImagePath: string
  memberName: string
  emailId: string
  majorPosition: string
  subPosition: string
  regionDetail: {
    cityName: string
    divisionName: string
  }
  profileTeamInforms: {
    teamName: string
    teamCode: string
    teamLogoImagePath: string
  }[]
}

// 프로필 완성도 정보
export type ProfileCompletionMenu = {
  profileCompletion: number
}

// 활동 로그
export type ProfileLogItem = {
  profileLogId: number
  isLogPublic: boolean
  logType: string
  modifiedAt: string
  logTitle: string
  logContent: string
}

// 보유 스킬
export type ProfileSkillItem = {
  profileSkillId: number
  skillName: string
  skillLevel: string
}
export type ProfileSkillItems = ProfileSkillItem[]

// 활동 이력
export type ProfileActivityItem = {
  profileActivityId: number
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string
  isActivityVerified: boolean
  activityDescription: string
}
export type ProfileActivityItems = ProfileActivityItem[]

// 포트폴리오
export type ProfilePortfolioItem = {
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
export type ProfilePortfolioItems = ProfilePortfolioItem[]

// 학력 정보
export type ProfileEducationItem = {
  profileEducationId: number
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  isAttendUniversity: boolean
  isEducationVerified: boolean
  educationDescription: string
}
export type ProfileEducationItems = ProfileEducationItem[]

// 수상 내역
export type ProfileAwardsItem = {
  profileAwardsId: number
  awardsName: string
  awardsRanking: string
  awardsDate: string
  isAwardsVerified: boolean
  awardsDescription: string
}
export type ProfileAwardsItems = ProfileAwardsItem[]

// 자격증
export type ProfileLicenseItem = {
  profileLicenseId: number
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  isLicenseVerified: boolean
  licenseDescription: string
}
export type ProfileLicenseItems = ProfileLicenseItem[]

// 링크
export type ProfileLinkItem = {
  profileLinkId: number
  linkName: string
  linkPath: string
}
export type ProfileLinkItems = ProfileLinkItem[]

// 전체 프로필 타입
export type ProfileDetail = {
  isMyProfile: boolean
  profileCompletionMenu: ProfileCompletionMenu
  profileInformMenu: ProfileInformMenu
  profileLogItem: ProfileLogItem
  profileSkillItems: ProfileSkillItems
  profileActivityItems: ProfileActivityItems
  profilePortfolioItems: ProfilePortfolioItems
  profileEducationItems: ProfileEducationItems
  profileAwardsItems: ProfileAwardsItems
  profileLicenseItems: ProfileLicenseItems
  profileLinkItems: ProfileLinkItems
}
