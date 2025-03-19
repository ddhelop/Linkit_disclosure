import { loadTeamHistory } from '@/features/team-view/loader'
import TeamViewHistory from '@/features/team/view/history/TeamViewHistory'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function TeamHistoryPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params

  const dehydratedState = await loadTeamHistory(teamName)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="h-full ">
        <TeamViewHistory teamName={teamName} />
      </div>
    </HydrationBoundary>
  )
}
