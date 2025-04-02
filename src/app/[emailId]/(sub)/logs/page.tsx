'use client'
import { ProfileLogItem } from '@/features/profile/api/getProfileLogs'
import { getProfileLogs } from '@/features/profile/api/profileLogApi'
import ProfileLogCard from '@/shared/components/Card/ProfileLogCard'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProfileViewLogsPage({ params }: { params: { emailId: string } }) {
  const [profileLogs, setProfileLogs] = useState<ProfileLogItem[]>([])

  useEffect(() => {
    const fetchProfileLogs = async () => {
      const response = await getProfileLogs(params.emailId)
      setProfileLogs(response.result.profileLogItems)
    }
    fetchProfileLogs()
  }, [params.emailId])

  return (
    <div className="flex flex-col px-2 py-10 lg:px-[4.25rem] lg:py-[3.62rem]">
      <Link href={`/${params.emailId}`} className="flex items-center gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="arrow" />
        <span className="text-xl font-semibold text-black">뒤로가기</span>
      </Link>

      {/* 로그 리스트 */}
      <div className="mt-6 flex flex-col gap-4">
        {profileLogs.map((log) => (
          <ProfileLogCard key={log.profileLogId} logItem={log} emailId={params.emailId} />
        ))}
      </div>
    </div>
  )
}
