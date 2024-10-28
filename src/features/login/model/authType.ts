// src/features/auth/model/authTypes.ts
export interface LoginResponse {
  result: {
    accessToken: string
    email: string
    isMemberBasicInform: boolean
  }
}
