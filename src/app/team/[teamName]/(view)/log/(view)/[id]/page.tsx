import { getTeamInfo } from '@/features/team/api/teamApi'
import TeamViewDetail from '@/features/team/view/log/TeamViewDetail'
import MiniTeamCard from '@/shared/components/MiniTeamCard'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default async function TeamViewLogDetailPage({ params }: { params: { id: number; teamName: string } }) {
  const { teamName, id } = params
  const teamInfo = await getTeamInfo(teamName)
  return (
    <>
      <div className="flex h-[calc(100vh-4rem)] w-full justify-center ">
        <div className="flex w-[83%] flex-col items-center  gap-8 py-[3.62rem]">
          <div className="flex w-full gap-8">
            <TeamViewDetail teamName={teamName} id={id} />
            <div>
              <MiniTeamCard teamInfo={teamInfo} />
            </div>
          </div>

          <Link href={`/team/${teamName}/log`} className="flex w-full ">
            <Button className=" border border-grey40 bg-[#fcfcfd] text-grey70" animationMode="grey" mode="custom">
              목록으로
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
