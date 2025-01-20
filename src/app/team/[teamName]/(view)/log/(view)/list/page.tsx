import { getTeamInfo } from '@/features/team/api/teamApi'
import TeamViewLogList from '@/features/team/view/log/TeamViewLogList'
import MiniTeamCard from '@/shared/components/MiniTeamCard'
import Image from 'next/image'
import Link from 'next/link'

export default async function TeamViewLogListPage({ params }: { params: { teamName: string } }) {
  const teamInfo = await getTeamInfo(params.teamName)

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)] w-full justify-center px-0">
        <div className="flex w-[83%] flex-col items-center  gap-8">
          {/* 헤더 */}
          <div className="flex w-full gap-1">
            <Link href={`/team/${params.teamName}/log`}>
              <Image src={'/common/icons/arrow-left.svg'} alt="arrow-left" width={24} height={24} />
            </Link>
            <h1 className="text-xl font-semibold">{params.teamName}의 로그</h1>
          </div>

          <div className="flex w-full gap-8">
            <TeamViewLogList params={params} />

            <div>
              <MiniTeamCard teamInfo={teamInfo} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
