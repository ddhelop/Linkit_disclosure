'use client'

import { useEffect, useState } from 'react'
import { getTeamLogs } from '../../api/teamApi'
import TeamLogComponent from './TeamLogComponent'
import { TeamLogItem } from '../../types/team.types'

export default function TeamEditLog({ teamName }: { teamName: string }) {
  const [logs, setLogs] = useState<TeamLogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getTeamLogs(teamName)
        setLogs(data.result.teamLogItems)
      } catch (error) {
        console.error('Failed to fetch logs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogs()
  }, [teamName])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="mt-6 flex flex-col gap-6">
      {logs.map((log) => (
        <TeamLogComponent key={log.teamLogId} log={log} />
      ))}
    </div>
  )
}
