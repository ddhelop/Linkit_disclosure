import { getTeamDetail } from '@/features/team-view/api/TeamDataViewApi'
import TeamViewWideInfo from '@/features/team-view/ui/TeamViewWideInfo'

export default async function TeamViewLogDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { teamName: string }
}) {
  const teamInfo = await getTeamDetail(params.teamName)

  return (
    <div className="absolute left-0 flex h-[calc(100vh-4rem)] w-full flex-col bg-white">
      <div className="absolute left-0 flex h-[22.4rem] w-full flex-col gap-10">
        <TeamViewWideInfo teamInfo={teamInfo.result} />
        <div className=" w-full ">{children}</div>
      </div>
    </div>
  )
}
