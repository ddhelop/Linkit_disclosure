// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getTeamDetail } from './api/TeamDataViewApi'

export async function loadTeamData(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamData', teamName],
    queryFn: () => getTeamDetail(teamName),
  })

  return dehydrate(queryClient)
}
