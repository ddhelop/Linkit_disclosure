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
    <div className="mt-[6.25rem] flex h-full w-full flex-col items-center">
      <p className="text-sm text-grey60">팀 프로필을 완성해 보세요</p>
      <Link href={`/team/${teamName}/edit/${currentSection}`}>
        <Button
          animationMode="black"
          mode="black"
          size="custom"
          className="mt-8 rounded-full px-10 py-3 text-base font-semibold"
        >
          추가하기
        </Button>
      </Link>
    </div>
  )
}
