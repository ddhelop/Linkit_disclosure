// src/features/auth/model/authTypes.ts
export interface LoginResponse {
  accessToken: string
  email: string
  existMemberBasicInform: boolean
}
