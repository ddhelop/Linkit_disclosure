'use client'

import Link from 'next/link'

interface ProfileEditBottomNavProps {
  prevPath?: string
  nextPath?: string
  isLastPage?: boolean
  isFirstPage?: boolean
}

export default function ProfileEditBottomNav({
  prevPath,
  nextPath,
  isLastPage = false,
  isFirstPage = false,
}: ProfileEditBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-end gap-3 border-t bg-white px-4 md:hidden">
      <Link
        href={prevPath || '/profile/edit/basic'}
        className={`flex h-10 items-center justify-center rounded-lg border border-grey30 px-6 text-sm font-medium text-grey90 ${
          isFirstPage ? 'hidden' : ''
        }`}
      >
        이전
      </Link>

      <Link
        href={nextPath || '#'}
        className={`flex h-10 items-center justify-center rounded-lg border border-grey30 px-6 text-sm font-medium ${isLastPage ? 'hidden' : ''}`}
      >
        다음
      </Link>
    </div>
  )
}
