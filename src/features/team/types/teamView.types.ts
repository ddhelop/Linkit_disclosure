export interface TeamMember {
  profileCurrentStates: [
    {
      profileStateName: string
    },
    {
      profileStateName: string
    },
  ]
  profileImagePath: string | null
  memberName: string
  isProfilePublic: boolean
  majorPosition: string
  regionDetail: {
    cityName: string | null
    divisionName: string | null
  }
}
