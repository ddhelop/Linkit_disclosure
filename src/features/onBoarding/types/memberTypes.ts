export interface MemberInfo {
  memberName: string
  contact: string
}

// src/features/member/types/memberTypes.ts

export interface ConsentInfo {
  isServiceUseAgree: boolean
  isPrivateInformAgree: boolean
  isAgeCheck: boolean
  isMarketingAgree: boolean
}

export interface ConsentRequest {
  data: ConsentInfo
  accessToken: string
}
