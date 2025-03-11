// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getTeamDetail } from './api/TeamDataViewApi'
import { getTeamRepresentLog } from './api/TeamDataItemsApi'

export async function loadTeamData(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamData', teamName],
    queryFn: () => getTeamDetail(teamName),
  })

  return dehydrate(queryClient)
}

export async function loadTeamRepresentLog(teamName: string) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['teamRepresentLog', teamName],
    queryFn: () => getTeamRepresentLog(teamName),
  })

  return dehydrate(queryClient)
}
