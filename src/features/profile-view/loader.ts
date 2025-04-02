// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getProfileDetail } from './api/ProfileViewApi'
import { getProfileLogDetail } from '../profile/api/profileLogApi'
const queryClient = new QueryClient()

export async function loadProfileDetailData(emailId: string) {
  await queryClient.prefetchQuery({
    queryKey: ['profileDetail', emailId],
    queryFn: () => getProfileDetail(emailId),
  })

  return dehydrate(queryClient)
}

// 프로필 로그 상세 보기
export async function loadProfileLogDetailData(profileLogId: number) {
  await queryClient.prefetchQuery({
    queryKey: ['profileLogDetail', profileLogId],
    queryFn: () => getProfileLogDetail(profileLogId),
  })

  return dehydrate(queryClient)
}
