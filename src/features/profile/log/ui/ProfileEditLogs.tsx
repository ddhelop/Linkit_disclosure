'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyProfileLogs } from '../api/getProfileLog'
import ProfileEditLogItem from './ProfileEditLogItem'
import { LogListSkeleton } from '../../edit/components/skeletons/LogListSkeleton'
import NotContentsUi from '../../edit/components/common/NotContentsUi'
import { useScrollTopOnMount } from '@/shared/hooks/useScrollTopOnMount'

export default function ProfileEditLogs() {
  useScrollTopOnMount()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['myProfileLogs'],
    queryFn: getMyProfileLogs,
  })

  const logs = data?.result?.profileLogItems ?? []

  if (isLoading) return <LogListSkeleton />
  if (logs.length === 0)
    return (
      <div className="mt-6">
        <NotContentsUi />
      </div>
    )

  return (
    <div className="mt-5 flex flex-col gap-4 pt-1">
      {logs.map((log) => (
        <ProfileEditLogItem key={log.profileLogId} log={log} isOnlyLog={logs.length === 1} refetch={refetch} />
      ))}
    </div>
  )
}
