// features/home/loader.ts
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getAnnouncements, getPopularLog, getRecommendedTeamMembers, getRecommendedTeams } from './api/homeApi'

export async function loadHomeData() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({ queryKey: ['popularLog'], queryFn: getPopularLog })
  await queryClient.prefetchQuery({ queryKey: ['announcements'], queryFn: getAnnouncements })
  await queryClient.prefetchQuery({ queryKey: ['recommendedTeams'], queryFn: getRecommendedTeams })
  await queryClient.prefetchQuery({ queryKey: ['recommendedTeamMembers'], queryFn: getRecommendedTeamMembers })

  return dehydrate(queryClient)
}
