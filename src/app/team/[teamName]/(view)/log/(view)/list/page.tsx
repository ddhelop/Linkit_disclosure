import { getTeamCard, getTeamLogList } from '@/features/team-view/api/TeamDataViewApi'
import TeamViewLogComponent from '@/features/team/view/log/TeamViewLogComponent'
import MiniTeamCard from '@/shared/components/MiniTeamCard'
import Image from 'next/image'
import Link from 'next/link'

export default async function TeamViewLogListPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params
  const teamlogs = await getTeamLogList(teamName)
  const teamInfo = await getTeamCard(teamName)

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)] w-full justify-center ">
        <div className="flex w-[95%] flex-col items-center gap-8  py-[3.62rem] lg:w-[83%]">
          {/* 헤더 */}
          <div className="flex w-full gap-1">
            <Link href={`/team/${params.teamName}/log`}>
              <Image src={'/common/icons/arrow-left.svg'} alt="arrow-left" width={24} height={24} />
            </Link>
            <h1 className="text-xl font-semibold">{teamName}의 로그</h1>
          </div>

          <div className="flex w-full gap-8">
            <div className="flex w-full flex-col gap-3 lg:gap-6">
              {teamlogs?.result.teamLogItems.map((log) => (
                <TeamViewLogComponent key={log.teamLogId} log={log} teamName={params.teamName} />
              ))}
            </div>

            <div className="hidden lg:block">
              <MiniTeamCard teamInfo={teamInfo.result} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
