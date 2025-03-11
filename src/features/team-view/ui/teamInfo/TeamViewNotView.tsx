'use client'

import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function TeamViewNotView() {
  const params = useParams()
  const pathname = usePathname()
  const teamName = params.teamName
  const currentSection = pathname.split('/').pop()

  return (
    <div className="mt-[5rem] flex w-full flex-col items-center gap-9  ">
      <span className="text-sm text-grey60">팀 프로필을 완성해 보세요</span>
      <div className="">
        <Link
          href={`/team/${teamName}/edit/history`}
          className="white flex items-center gap-2 rounded-full bg-grey80 px-10 py-4 font-semibold text-white hover:brightness-125"
        >
          <span>추가하기</span>
        </Link>
      </div>
    </div>
  )
}
