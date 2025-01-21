export interface ILogCard {
  id: number
  domainType: 'PROFILE' | 'TEAM'
  createdAt: string
  logTitle: string
  logContent: string
  logInformDetails: {
    teamLogoImagePath: string
    teamName: string
    memberName: string
    emailId: string
    teamCode: string
  }
}
