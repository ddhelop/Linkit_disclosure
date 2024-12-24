import TeamViewLog from '@/features/team/view/log/TeamViewLog'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamLogPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col pt-[3rem]">
      <TeamViewLog params={params} />

      <div className="mt-10 flex justify-center">
        <Link href={`/team/${params.teamName}/log/list`}>
          <Button
            mode="custom"
            animationMode="grey"
            size="custom"
            className="flex items-center gap-2 rounded-full border border-grey30 bg-white px-6 py-2 text-sm text-grey80"
          >
            <span>팀이름의 로그 더보기</span>
            <Image src={'/common/icons/arrow-right(greyblack).svg'} alt="arrow-right" width={22} height={22} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
