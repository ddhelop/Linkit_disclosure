/** 활동 지역 정보 */
export interface RegionDetail {
  cityName: string
  divisionName: string
}

/** 프로필 상태 정보 */
export interface ProfileState {
  profileStateName: string // 예: "팀원 찾는 중", "팀 찾는 중"
}

/** 개인 프로필 정보 */
export interface Profile {
  isProfilePublic: boolean
  profileCurrentStates: ProfileState[]
  isProfileScrap?: boolean
  profileScrapCount?: number
  profileImagePath: string
  memberName: string
  emailId: string
  majorPosition: string
  subPosition: string
  regionDetail: RegionDetail
}
