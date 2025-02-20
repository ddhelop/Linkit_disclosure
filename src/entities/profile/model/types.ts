export interface ProfileSkillItem {
  profileSkillId: number
  skillName: string
  skillLevel: string
}

export interface ProfileActivityItem {
  profileActivityId: number
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string
  isActivityVerified: boolean
  activityDescription: string
}

export interface ProfilePortfolioItem {
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

export interface ProfileEducationItem {
  profileEducationId: number
  universityName: string
  majorName: string
  admissionYear: string
  graduationYear: string
  isAttendUniversity: boolean
  isEducationVerified: boolean
  educationDescription: string
}

export interface ProfileAwardsItem {
  profileAwardsId: number
  awardsName: string
  awardsRanking: string
  awardsDate: string
  isAwardsVerified: boolean
  awardDescription: string
}

export interface ProfileLicenseItem {
  profileLicenseId: number
  licenseName: string
  licenseInstitution: string
  licenseAcquisitionDate: string
  isLicenseVerified: boolean
}

export interface ProfileLinkItem {
  profileLinkId: number
  linkName: string
  linkPath: string
}

export interface ProfileDetailData {
  isMyProfile: boolean
  profileCompletionMenu: {
    profileCompletion: number
  }
  profileInformMenu: {
    emailId: string
    isProfileScrap: boolean
    profileCurrentStates: Array<{ profileStateName: string }>
    profileImagePath: string
    memberName: string
    isProfilePublic: boolean
    majorPosition: string
    profileScrapCount: number
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
  profileScrapCount: number
  profileLogItem: {
    profileLogId: number
    isLogPublic: boolean
    logType: string
    modifiedAt: string
    logTitle: string
    logContent: string
  }
  profileSkillItems: ProfileSkillItem[]
  profileActivityItems: ProfileActivityItem[]
  profilePortfolioItems: ProfilePortfolioItem[]
  profileEducationItems: ProfileEducationItem[]
  profileAwardsItems: ProfileAwardsItem[]
  profileLicenseItems: ProfileLicenseItem[]
  profileLinkItems: ProfileLinkItem[]
}
