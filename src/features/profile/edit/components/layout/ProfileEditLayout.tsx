'use client'

import React from 'react'
import MiniProfileCard from '@/shared/components/MiniProfileCard'

interface ProfileEditLayoutProps {
  children: React.ReactNode
}

export default function ProfileEditLayout({ children }: ProfileEditLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* 왼쪽 사이드바 영역 */}
        <aside className="w-[280px] flex-shrink-0 space-y-6">
          {/* <ProfileProgress /> */}
          {/* <MiniProfileCard /> */}
        </aside>

        {/* 오른쪽 메인 컨텐츠 영역 */}
        <main className="flex-1 rounded-lg border border-grey40 bg-white p-6">{children}</main>
      </div>
    </div>
  )
}
