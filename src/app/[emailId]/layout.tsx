import React from 'react'
import { HydrationBoundary } from '@tanstack/react-query'
import { loadProfileDetailData } from '@/features/profile-view/loader'
import ProfileViewBasic from '@/features/profile-view/ui/ProfileViewBasic'

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { emailId: string }
}) {
  const emailId = params.emailId
  const dehydratedState = await loadProfileDetailData(emailId)

  return (
    <div className="flex w-full flex-col pb-20">
      <HydrationBoundary state={dehydratedState}>
        {/* 프로필 기본 정보 (상단 고정) */}
        <ProfileViewBasic emailId={emailId} />

        {/* 페이지별 컨텐츠 */}
        <div className="flex flex-grow flex-col">{children}</div>
      </HydrationBoundary>
    </div>
  )
}
