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
          <div className="mt-[3rem] flex w-full flex-col items-center font-semibold text-grey60">
            아직 작성한 내용이 없어요
            <button className="mt-5 rounded-full bg-grey80 px-10 py-4 text-white hover:brightness-125">추가하기</button>
          </div>
        )
      ) : (
        <>
          <div className="mt-7 flex flex-col gap-3 lg:gap-6">
            {/* 팀 로그 제목 및 수정하기 */}
            {isTeamManager && (
              <div className="flex w-full items-center justify-between">
                <h3 className="text-xl text-grey80">팀 로그</h3>
                <Link
                  href={`/team/${teamName}/edit/log`}
                  className="flex items-center gap-2 rounded-full bg-grey80 px-6 py-3 text-sm text-white hover:brightness-125"
                >
                  <Image src={'/common/icons/white_pencil.svg'} alt="pencil" width={16} height={16} />
                  <span>수정하기</span>
                </Link>
              </div>
            )}
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
