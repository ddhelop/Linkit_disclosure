'use client'
import TeamViewNotView from '../../../team-view/ui/teamInfo/TeamViewNotView'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useTeamStore } from '../../store/useTeamStore'
import TeamViewRepresentLog from './TeamViewRepresentLog'
import { useQuery } from '@tanstack/react-query'
import { getTeamRepresentLog } from '@/features/team-view/api/TeamDataItemsApi'

export default function TeamViewLog({ teamName }: { teamName: string }) {
  const { isTeamManager } = useTeamStore()

  const { data } = useQuery({
    queryKey: ['teamRepresentLog', teamName],
    queryFn: () => getTeamRepresentLog(teamName),
  })
  const log = data?.result
  const isEmpty = !log || Object.keys(log).length === 0

  return (
    // 데이터가 {}일때
    <div className="">
      {isEmpty ? (
        isTeamManager ? (
          <TeamViewNotView />
        ) : (
          <div className="mt-[3rem] flex w-full justify-center font-semibold text-grey60">
            아직 작성한 내용이 없어요
          </div>
        )
      ) : (
        <>
          <div className="mt-10 flex flex-col gap-3 lg:gap-6">
            <TeamViewRepresentLog log={log} teamName={teamName} />
          </div>
          <div className="mt-10 flex justify-center">
            <Link href={`/team/${teamName}/log/list`}>
              <Button
                mode="custom"
                size="custom"
                animationMode="none"
                className="flex items-center gap-2 rounded-full border border-grey30 bg-white px-6 py-2 text-sm text-grey80 hover:bg-grey10"
              >
                <span>로그 더보기</span>
                <Image src={'/common/icons/arrow-right(greyblack).svg'} alt="arrow-right" width={22} height={22} />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
