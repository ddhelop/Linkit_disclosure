import { loadTeamData } from '@/features/team-view/loader'
import TeamViewClient from '@/features/team-view/ui/teamInfo/TeamViewClient'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function TeamLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string; teamName: string }
}) {
  const teamName = params.teamName
  const dehydratedState = await loadTeamData(teamName)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={`h-[calc(100v h-4rem)] flex flex-col bg-grey10`}>
        <TeamViewClient teamName={teamName} />
        <div className="min-h-[calc(100vh-26.5rem)] bg-grey10 px-4 lg:px-[7.12rem]">{children}</div>
      </div>
    </HydrationBoundary>
  )
}
