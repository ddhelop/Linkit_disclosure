'use client'
import { useEffect, useState } from 'react'
import { getTeamLogDetail } from '../../api/teamViewApi'
import { TeamLogItem } from '../../types/team.types'
import { stripHtmlAndImages } from '@/shared/hooks/useHtmlToString'

export default function TeamViewDetail({ teamName, id }: { teamName: string; id: number }) {
  const [log, setLog] = useState<TeamLogItem | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamLogDetail(teamName, id)
      setLog(response.result)
    }
    fetchData()
  }, [id, teamName])

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-white px-5 py-7">
      <div className="flex items-center gap-2 pl-5">
        <span className="text-xl font-semibold text-grey80">{log?.logTitle}</span>
        <span className="text-sm font-normal text-grey60">|</span>
        <span className="text-sm font-normal text-grey60">{new Date(log?.modifiedAt ?? '').toLocaleDateString()}</span>
      </div>

      <div className="rounded-xl bg-grey10 p-6 text-sm text-grey70">{stripHtmlAndImages(log?.logContent ?? '')}</div>
    </div>
  )
}
