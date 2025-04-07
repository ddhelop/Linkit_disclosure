import { getTeamLogList } from '@/features/team-view/api/TeamDataViewApi'
import TeamViewLogComponent from '@/features/team/view/log/TeamViewLogComponent'

export default async function TeamViewLogListPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params
  const teamlogs = await getTeamLogList(teamName)
  console.log(teamlogs.result.teamLogItems)

  return (
    <>
      <div className="flex w-full justify-center pb-10">
        <div className="flex w-[96%] flex-col gap-3 lg:w-[90%] lg:gap-4">
          {teamlogs?.result.teamLogItems.map((log) => (
            <TeamViewLogComponent key={log.teamLogId} log={log} teamName={params.teamName} />
          ))}
        </div>
      </div>
    </>
  )
}
