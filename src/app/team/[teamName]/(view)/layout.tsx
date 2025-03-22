import { getTeamDetail } from '@/features/team-view/api/TeamDataViewApi'
import { loadTeamData } from '@/features/team-view/loader'
import TeamViewClient from '@/features/team-view/ui/teamInfo/TeamViewClient'
import { HydrationBoundary } from '@tanstack/react-query'

export async function generateMetadata({ params }: { params: { teamName: string } }) {
  const teamName = params.teamName
  const teamData = await getTeamDetail(teamName)
  const name = teamData.result.teamInformMenu.teamName
  const teamLogoImage = teamData.result.teamInformMenu.teamLogoImagePath
  return {
    title: `${name}`,
    description: `${name} 팀 소개`,
    openGraph: {
      title: `${name}`,
      description: '팀 소개 페이지입니다.',
      url: `https://linkit.im/team/${teamName}/log`,
      images: [
        {
          url: teamLogoImage,
          width: 600,
          height: 600,
        },
      ],
    },
  }
}

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
