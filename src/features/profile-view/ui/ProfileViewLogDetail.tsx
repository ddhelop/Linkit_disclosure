'use client'
import { getProfileLogDetail } from '@/features/profile/api/profileLogApi'
import useLinkifyContent from '@/shared/hooks/useLinkifyContent'
import { useScrollTopOnMount } from '@/shared/hooks/useScrollTopOnMount'
import ShareLinkButton from '@/shared/components/ShareLinkButton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function ProfileViewLogDetail({ profileLogId }: { profileLogId: number }) {
  useScrollTopOnMount()
  const { data } = useQuery({
    queryKey: ['profileLogDetail', profileLogId],
    queryFn: () => getProfileLogDetail(profileLogId),
  })
  const profileLog = data?.result

  // 링크 자동 변환 훅 사용
  useLinkifyContent('log-content', profileLog?.logContent)

  return (
    <>
      <div className="flex w-full flex-col gap-4 border-grey40 bg-white p-4 lg:rounded-xl lg:border lg:border-grey40 lg:p-6  ">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {profileLog?.logType === 'REPRESENTATIVE_LOG' && (
              <div className="rounded-md bg-grey20 p-2 text-xs font-normal text-main">대표글</div>
            )}
            <span className="font-semibold text-grey80">{profileLog?.logTitle}</span>
          </div>

          <ShareLinkButton />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-normal text-grey60">
            {profileLog?.modifiedAt ? new Date(profileLog?.modifiedAt).toLocaleDateString() : ''}
          </span>
          <span className="text-xs text-grey50">·</span>
          <span className="text-xs text-grey60">조회수 {profileLog?.logViewCount}</span>
        </div>
        <hr className="my-5 border-grey30" />

        <div
          id="log-content"
          className="rounded-xl text-sm leading-7 text-grey70 [&>h1]:text-2xl [&>h1]:font-semibold [&>h2]:text-xl [&>h2]:font-semibold"
        />
      </div>
    </>
  )
}
