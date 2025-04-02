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
      <div className="lg::py-[3.62rem] flex flex-col pt-10 lg:px-[4.62rem]">
        <div className="flex w-full flex-col gap-4 border border-transparent bg-white p-4 lg:rounded-xl lg:px-[2.75rem] lg:py-[1.88rem]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-grey80">{profileLog?.logTitle}</span>
            <span className="text-xs text-grey50">|</span>
            <span className="text-xs font-normal text-grey60">
              {profileLog?.modifiedAt ? new Date(profileLog?.modifiedAt).toLocaleDateString() : ''}
            </span>
          </div>

          <div
            className="rounded-xl text-sm leading-7 text-grey70 lg:bg-grey10 lg:px-6 lg:py-[1.31rem] [&>h1]:text-2xl [&>h1]:font-semibold [&>h2]:text-xl [&>h2]:font-semibold"
            dangerouslySetInnerHTML={{ __html: profileLog?.logContent ?? '' }}
          />
        </div>

        <div className="mt-5 flex">
          <Link
            href={`/${params.emailId}/logs`}
            className="ml-3 cursor-pointer rounded-[0.63rem] border border-grey40 bg-[#FCFCFD] px-5 py-[0.38rem] text-grey70 hover:bg-grey10 lg:ml-0"
          >
            목록으로
          </Link>
        </div>
      </div>
    </>
  )
}
