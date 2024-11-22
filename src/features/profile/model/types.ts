export interface ProfileData {
  profileId: number
  profileImagePath: string
  memberName: string
  profilePositionItem: {
    majorPosition: string
    subPosition: string
  }
  cityName: string
  divisionName: string
  profileCurrentStateItems: {
    profileCurrentStates: Array<{ profileStateName: string }>
  }
  isProfilePublic: boolean
}
