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

// ... 다른 인터페이스들도 동일하게 정의 ...

export interface ProfileDetailData {
  isMyProfile: boolean
  profileCompletionMenu: {
    profileCompletion: number
  }
  profileInformMenu: {
    profileCurrentStates: Array<{ profileStateName: string }>
    profileImagePath: string
    memberName: string
    isProfilePublic: boolean
    majorPosition: string
    regionDetail: {
      cityName: string
      divisionName: string
    }
  }
  profileScrapCount: number
  profileLogItem: {
    profileLogId: number
    isLogPublic: boolean
    profileLogType: string
    modifiedAt: string
    logTitle: string
    logContent: string
  }
  profileSkillItems: ProfileSkillItem[]
  profileActivityItems: ProfileActivityItem[]
  profilePortfolioItems: ProfilePortfolioItem[]
  // ... 나머지 항목들
}
