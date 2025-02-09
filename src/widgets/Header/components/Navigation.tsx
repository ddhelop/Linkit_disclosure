'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="ml-12 hidden h-full items-center text-grey60 md:flex">
      <Link
        href="/find/private"
        className={`mt-2 flex h-full w-[6.12rem] items-center justify-center border-b-2 pb-2 hover:border-main hover:text-grey100 ${
          pathname === '/find/private' ? 'border-main text-grey100' : 'border-transparent'
        }`}
      >
        팀원
      </Link>
      <Link
        href="/find/team"
        className={`mt-2 flex h-full w-[6.12rem] items-center justify-center border-b-2 pb-2 hover:border-main hover:text-grey100 ${
          pathname === '/find/team' ? 'border-main text-grey100' : 'border-transparent'
        }`}
      >
        팀
      </Link>
      <Link
        href="/find/announcement"
        className={`mt-2 flex h-full w-[6.12rem] items-center justify-center border-b-2 pb-2 hover:border-main hover:text-grey100 ${
          pathname === '/find/announcement' ? 'border-main text-grey100' : 'border-transparent'
        }`}
      >
        모집 공고
      </Link>
    </div>
  )
}
