'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTeamHistory } from '../../api/teamApi'
import { TeamHistory } from '../../types/team.types'

export default function TeamEditHistoy({ teamName }: { teamName: string }) {
  const [history, setHistory] = useState<TeamHistory[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getTeamHistory(teamName)
      setHistory(history.result.teamHistoryItems)
    }
    fetchHistory()
  }, [teamName])

  return (
    <div className="mt-5 flex flex-col gap-5">
      {history.map((item) => (
        <div key={item.teamHistoryId} className="rounded-xl bg-white px-10 py-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-grey80">{item.historyName}</span>
              <span className="text-xs font-normal text-grey60">
                {item.historyStartDate} ~ {item.historyEndDate}
              </span>
            </div>
            <Image src="/common/icons/more_row.svg" alt="delete" width={20} height={20} className="cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  )
}
