import { fetchWithCSR } from '@/shared/api/fetchData'
import { ProfileLogDetailType } from '../types'

// 프로필 로그 수정
export const updateProfileLog = async (logId: number, log: ProfileLogDetailType) => {
  return fetchWithCSR(`/profile/log/${logId}`, {
    method: 'POST',
    body: JSON.stringify(log),
  })
}

// 대표글 설정
export const updateProfileLogType = async (logId: number) => {
  return fetchWithCSR(`/profile/log/type/${logId}`, {
    method: 'POST',
  })
}

// 비공개 공개 업데이트
export const updateProfileLogPublic = async (logId: number) => {
  return fetchWithCSR(`/profile/log/state/${logId}`, {
    method: 'POST',
  })
}
