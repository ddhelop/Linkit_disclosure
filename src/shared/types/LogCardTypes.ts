// src/shared/types/LogTypes.ts

/** 도메인 타입 */
export type DomainType = 'PROFILE' | 'TEAM'

/** 로그 상세 정보 */
export interface LogInformDetails {
  emailId?: string
  profileLogId?: number
  teamLogId?: number
  memberName?: string
  profileImagePath?: string
  teamCode?: string
  teamLogoImagePath?: string
  teamName?: string
}

/** 로그 카드 타입 */
export interface LogCardType {
  id: number
  domainType: DomainType
  createdAt: string
  logTitle: string
  logContent: string
  logInformDetails: LogInformDetails
}
