'use client'

import TeamLogComponent from './TeamLogComponent'

import NotContentsUi from '@/features/profile/edit/components/common/NotContentsUi'
import { TeamLog } from '../../types/team.types'
import { useQuery } from '@tanstack/react-query'
import { getTeamLogs } from '../../api/teamViewApi'
import { useScrollTopOnMount } from '@/shared/hooks/useScrollTopOnMount'

export default function TeamEditLog({ teamName }: { teamName: string }) {
  useScrollTopOnMount()
  const { data, refetch } = useQuery({
    queryKey: ['teamLogs', teamName],
    queryFn: () => getTeamLogs(teamName),
  })
  const logs = data?.result.teamLogItems
  console.log(logs)

  // 로그 삭제 후 UI 업데이트를 위한 핸들러
  const handleLogDelete = (deletedLogId: number) => {
    refetch()
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {logs && logs.length > 0 ? (
        logs.map((log) => (
          <TeamLogComponent key={log.teamLogId} log={log} onDelete={() => handleLogDelete(log.teamLogId)} />
        ))
      ) : (
        <NotContentsUi />
      )}
    </div>
  )
}
