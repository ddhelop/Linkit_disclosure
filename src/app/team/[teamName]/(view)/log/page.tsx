import { loadTeamRepresentLog } from '@/features/team-view/loader'
import TeamViewLog from '@/features/team/view/log/TeamViewLog'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function TeamLogPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params

  const dehydratedState = await loadTeamRepresentLog(teamName)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col pb-10">
        <TeamViewLog teamName={teamName} />
      </div>
    </HydrationBoundary>
  )
}
