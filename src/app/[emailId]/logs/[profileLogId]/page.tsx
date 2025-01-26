'use client'
import { ProfileLogItem } from '@/features/profile/api/getProfileLogs'
import { getProfileLog } from '@/features/profile/api/profileLogApi'
import { stripHtmlAndImages } from '@/shared/utils/stringUtils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProfileLogDetailPage({ params }: { params: { emailId: string; profileLogId: number } }) {
  const [profileLog, setProfileLog] = useState<ProfileLogItem>()

  useEffect(() => {
    const fetchProfileLog = async () => {
      const response = await getProfileLog(params.profileLogId)
      setProfileLog(response.result)
    }
    fetchProfileLog()
  }, [params.profileLogId])
  return (
    <>
      <div className="flex flex-col px-[4.62rem] py-[3.62rem]">
        <div className="flex w-full flex-col gap-4 rounded-xl border border-transparent bg-white px-[2.75rem] py-[1.88rem] hover:border-main">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-grey80">{profileLog?.logTitle}</span>
            <span className="text-xs text-grey50">|</span>
            <span className="text-xs font-normal text-grey60">
              {profileLog?.modifiedAt ? new Date(profileLog?.modifiedAt).toLocaleDateString() : ''}
            </span>
          </div>

          <div className="rounded-xl bg-grey10 px-6 py-[1.31rem] text-sm text-grey70">
            {profileLog?.logContent ? stripHtmlAndImages(profileLog?.logContent) : ''}
          </div>
        </div>

        <div className="mt-5 flex">
          <Link
            href={`/${params.emailId}/logs`}
            className="cursor-pointer rounded-[0.63rem] border border-grey40 bg-[#FCFCFD] px-5 py-[0.38rem] text-grey70 hover:bg-grey10"
          >
            목록으로
          </Link>
        </div>
      </div>
    </>
  )
}
