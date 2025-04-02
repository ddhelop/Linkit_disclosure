import { loadTeamRecruitment } from '@/features/team-view/loader'
import TeamViewRecruitmentProvider from '@/features/team-view/ui/recruitment/TeamViewRecruitmentProvider'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function TeamViewRecruitDetailPage({ params }: { params: { teamName: string; id: string } }) {
  const teamName = params.teamName
  const id = params.id
  const dehydratedState = await loadTeamRecruitment(teamName, id)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="absolute left-0 flex w-full justify-center bg-[#FCFCFD] pb-28 lg:pb-[3.63rem]">
        <TeamViewRecruitmentProvider />
      </div>
    </HydrationBoundary>
  )
}
