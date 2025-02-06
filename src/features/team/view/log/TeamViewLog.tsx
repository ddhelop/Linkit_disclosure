'use client'

import { useEffect, useState } from 'react'
import TeamViewNotView from '../common/TeamViewNotView'
import TeamViewLogComponent from './TeamViewLogComponent'
import { getTeamLogs } from '../../api/teamApi'
import { TeamLogsResponse } from '../../types/team.types'
import Link from 'next/link'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useTeamStore } from '../../store/useTeamStore'

export default function TeamViewLog({ params }: { params: { teamName: string } }) {
  const [logs, setLogs] = useState<TeamLogsResponse>({
    isSuccess: false,
    code: '',
    message: '',
    result: {
      teamLogItems: [],
    },
  })
  const { isTeamManager } = useTeamStore()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamLogs(params.teamName)
      setLogs(response)
      console.log(response)
    }
    fetchData()
  }, [params.teamName])

  return (
    // 데이터가 없을 때
    <div className="">
      {logs.result.teamLogItems.length === 0 ? (
        isTeamManager ? (
          <TeamViewNotView />
        ) : (
          <div className="mt-[3rem] flex w-full justify-center font-semibold text-grey60">
            아직 작성한 내용이 없어요
          </div>
        )
      ) : (
        <>
          <div className="mt-10 flex flex-col gap-6">
            {logs.result.teamLogItems.map((log) => (
              <TeamViewLogComponent key={log.teamLogId} log={log} teamName={params.teamName} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href={`/team/${params.teamName}/log/list`}>
              <Button
                mode="custom"
                animationMode="grey"
                size="custom"
                className="flex items-center gap-2 rounded-full border border-grey30 bg-white px-6 py-2 text-sm text-grey80"
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
