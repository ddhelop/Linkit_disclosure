import { getTeamDetail } from '@/features/team-view/api/TeamDataViewApi'
import TeamViewWideInfo from '@/features/team-view/ui/TeamViewWideInfo'
import TeamViewDetail from '@/features/team/view/log/TeamViewDetail'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default async function TeamViewLogDetailPage({ params }: { params: { id: number; teamName: string } }) {
  const { teamName, id } = params
  const teamInfo = await getTeamDetail(teamName)

  return (
    <>
      <div className="flex w-full flex-col items-center gap-10 pb-10">
        <div className="flex w-full flex-col gap-8 lg:w-[90%] lg:flex-row">
          <TeamViewDetail teamName={teamName} id={id} />
        </div>

        <Link href={`/team/${teamName}/log`} className="flex w-full lg:w-[90%]">
          <Button
            className=" rounded-lg border border-grey40 bg-[#fcfcfd] text-grey70"
            animationMode="grey"
            mode="custom"
          >
            목록으로
          </Button>
        </Link>
      </div>
    </>
  )
}
