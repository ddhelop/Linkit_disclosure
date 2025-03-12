'use client'

import { useEffect, useState } from 'react'
import { getTeamLogs } from '../../api/teamApi'
import TeamLogComponent from './TeamLogComponent'

import NotContentsUi from '@/features/profile/edit/components/common/NotContentsUi'
import { TeamLog } from '../../types/team.types'

export default function TeamEditLog({ teamName }: { teamName: string }) {
  const [logs, setLogs] = useState<TeamLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getTeamLogs(teamName)
        setLogs(data.result)
      } catch (error) {
        console.error('Failed to fetch logs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogs()
  }, [teamName])

  // 로그 삭제 후 UI 업데이트를 위한 핸들러
  const handleLogDelete = (deletedLogId: number) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.teamLogId !== deletedLogId))
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="mt-6 flex flex-col gap-3">
      {logs.length > 0 ? (
        logs.map((log) => (
          <TeamLogComponent key={log.teamLogId} log={log} onDelete={() => handleLogDelete(log.teamLogId)} />
        ))
      ) : (
        <NotContentsUi />
      )}
    </div>
  )
}
