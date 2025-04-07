import { getProfileLogs } from '@/features/profile/log/api/getProfileLog'
import ProfileLogCard from '@/shared/components/Card/ProfileLogCard'

export default async function ProfileViewLogsPage({ params }: { params: { emailId: string } }) {
  const profileLogs = await getProfileLogs(params.emailId)

  return (
    <div className="flex w-full justify-center pb-10">
      <div className="flex w-[96%] flex-col gap-3 lg:w-[90%] lg:gap-4">
        {profileLogs?.result?.profileLogItems.map((log) => (
          <ProfileLogCard key={log.profileLogId} log={log} emailId={params.emailId} />
        ))}
      </div>
    </div>
  )
}
