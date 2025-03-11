import { loadTeamRecruitments } from '@/features/team-view/loader'
import TeamViewRecruitment from '@/features/team/view/recruitment/TeamViewRecruitment'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function TeamRecruitPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params

  const dehydratedState = await loadTeamRecruitments(teamName)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="">
        <TeamViewRecruitment teamName={teamName} />
      </div>
    </HydrationBoundary>
  )
}
