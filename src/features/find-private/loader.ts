// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getStaticFindPrivateData } from './api/FindPrivateApi'

export async function loadFindPrivateData() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({ queryKey: ['staticFindPrivateData'], queryFn: getStaticFindPrivateData })

  return dehydrate(queryClient)
}
