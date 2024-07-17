'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MatchNavigation() {
  const pathname = usePathname()

  return (
    <div className="mt-[9.5rem] flex w-[13.75rem] flex-col rounded-2xl bg-[#fff] shadow-sm">
      <Link href="/match/from">
        <div
          className={`cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10 ${
            pathname === '/match/from' ? 'font-bold text-grey100' : ''
          }`}
        >
          내가 받은 매칭
        </div>
      </Link>
      <Link href="/match/to">
        <div
          className={`cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10 ${
            pathname === '/match/to' ? 'font-bold text-grey100' : ''
          }`}
        >
          내가 보낸 매칭
        </div>
      </Link>
      <Link href="/match/accomplish">
        <div
          className={`cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10 ${
            pathname === '/match/accomplish' ? 'font-bold text-grey100' : ''
          }`}
        >
          성사된 매칭
        </div>
      </Link>
      <Link href="/match/save">
        <div
          className={`cursor-pointer px-5 py-[0.81rem] text-sm text-grey60 hover:bg-grey10 ${
            pathname === '/match/save' ? 'font-bold text-grey100' : ''
          }`}
        >
          찜한 내역
        </div>
      </Link>
    </div>
  )
}
