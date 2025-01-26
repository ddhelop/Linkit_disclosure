'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function MatchListController() {
  // URL의 현재 세그먼트 가져오기 (inbox, outbox, scrap 등)
  const currentSegment = useSelectedLayoutSegment()

  return (
    <>
      <div className="mt-8 flex gap-3">
        <Link
          href="/match/inbox"
          className={`cursor-pointer px-7 py-2 text-sm ${
            currentSegment === 'inbox' ? 'border-b-2 border-main font-semibold text-main' : 'text-grey60'
          }`}
        >
          수신함
        </Link>
        <Link
          href="/match/outbox"
          className={`cursor-pointer px-7 py-2 text-sm ${
            currentSegment === 'outbox' ? 'border-b-2 border-main font-semibold text-main' : 'text-grey60'
          }`}
        >
          발신함
        </Link>
        <Link
          href="/match/scrap"
          className={`cursor-pointer px-7 py-2 text-sm ${
            currentSegment === 'scrap' ? 'border-b-2 border-main font-semibold text-main' : 'text-grey60'
          }`}
        >
          스크랩
        </Link>
      </div>
    </>
  )
}
