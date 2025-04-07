// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getProfileDetail } from './api/ProfileViewApi'

const queryClient = new QueryClient()

export async function loadProfileDetailData(emailId: string) {
  await queryClient.prefetchQuery({
    queryKey: ['profileDetail', emailId],
    queryFn: () => getProfileDetail(emailId),
  })

  return dehydrate(queryClient)
}
