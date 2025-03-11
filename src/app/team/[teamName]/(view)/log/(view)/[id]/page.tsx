import { getTeamDetail } from '@/features/team-view/api/TeamDataViewApi'
import TeamViewDetail from '@/features/team/view/log/TeamViewDetail'
import MiniTeamCard from '@/shared/components/MiniTeamCard'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default async function TeamViewLogDetailPage({ params }: { params: { id: number; teamName: string } }) {
  const { teamName, id } = params
  const teamInfo = await getTeamDetail(teamName)
  return (
    <>
      <div className="flex w-full justify-center px-4 pb-10">
        <div className="flex w-full flex-col items-center gap-8  pt-5 lg:w-[83%] lg:py-[3.62rem]">
          <div className="flex w-full flex-col gap-8 lg:flex-row">
            <TeamViewDetail teamName={teamName} id={id} />
            <div className="flex justify-center">
              <div>
                <MiniTeamCard teamInfo={teamInfo.result} />
              </div>
            </div>
          </div>

          <Link href={`/team/${teamName}/log`} className="flex w-full ">
            <Button
              className=" rounded-lg border border-grey40 bg-[#fcfcfd] text-grey70"
              animationMode="grey"
              mode="custom"
            >
              목록으로
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
