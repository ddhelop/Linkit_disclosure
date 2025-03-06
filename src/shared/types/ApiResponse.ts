// src/shared/types/ApiResponse.ts

/** 모든 API의 공통 응답 타입 */
export interface ApiResponse<T> {
  isSuccess: boolean
  code: string
  message: string
  result: T
}
