'use client'

import { useEffect, useState } from 'react'
import TeamViewNotView from '../common/TeamViewNotView'
import TeamViewLogComponent from './TeamViewLogComponent'
import { getTeamLogs } from '../../api/teamApi'
import { TeamLogsResponse } from '../../types/team.types'

export default function TeamViewLog({ params }: { params: { teamName: string } }) {
  const [logs, setLogs] = useState<TeamLogsResponse>({
    isSuccess: false,
    code: '',
    message: '',
    result: {
      teamLogItems: [],
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamLogs(params.teamName)
      setLogs(response)
      console.log(response)
    }
    fetchData()
  }, [])

  return (
    // 데이터가 없을 때
    <div className="">
      {logs.result.teamLogItems.length === 0 ? (
        <TeamViewNotView />
      ) : (
        logs.result.teamLogItems.map((log) => <TeamViewLogComponent log={log} teamName={params.teamName} />)
      )}
    </div>
  )
}
