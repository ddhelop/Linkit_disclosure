// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getProfileDetail } from './api/ProfileViewApi'

export async function loadProfileDetailData(emailId: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({ queryKey: ['profileDetail'], queryFn: () => getProfileDetail(emailId) })

  return dehydrate(queryClient)
}
