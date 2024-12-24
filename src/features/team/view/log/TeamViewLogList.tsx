'use client'

import { useEffect, useState } from 'react'
import TeamViewLogComponent from './TeamViewLogComponent'
import { getTeamLogs } from '../../api/teamApi'
import { TeamLogItem, TeamLogsResponse } from '../../types/team.types'

export default function TeamViewLogList({ params }: { params: { teamName: string } }) {
  const [logs, setLogs] = useState<TeamLogItem[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await getTeamLogs(params.teamName)
      setLogs(response.result.teamLogItems)
    }
    fetchLogs()
  }, [params.teamName])

  return (
    <div className="flex w-full flex-col gap-6">
      {logs.map((log) => (
        <TeamViewLogComponent key={log.teamLogId} log={log} teamName={params.teamName} />
      ))}
    </div>
  )
}
