import { loadTeamMembers } from '@/features/team-view/loader'
import TeamViewMembers from '@/features/team/view/members/TeamViewMembers'
import { HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function TeamMembersPage({ params }: { params: { teamName: string } }) {
  const queryClient = new QueryClient()
  const { teamName } = params

  const dehydratedState = await loadTeamMembers(teamName)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="">
        <TeamViewMembers params={params} />
      </div>
    </HydrationBoundary>
  )
}
