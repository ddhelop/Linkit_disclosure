// src/widgets/Header/Header.tsx
'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const pathname = usePathname()

  // 특정 경로에서 Header를 숨기기
  const hideHeaderOnPaths = ['/login/onboarding-info', '/login/onboarding-agree', '/login/onboarding-complete']
  const basePath = pathname.split('?')[0] // 쿼리 파라미터 제거된 경로 확인

  if (hideHeaderOnPaths.includes(basePath)) {
    return null
  }

  const handleMouseEnter = () => {
    document.body.style.overflow = 'hidden' // 스크롤 비활성화
  }

  const handleMouseLeave = () => {
    document.body.style.overflow = '' // 스크롤 활성화
  }

  return (
    <>
      <header
        className="sticky top-0 z-[100] flex h-[3.5rem] w-full items-center justify-between bg-white px-10"
        onMouseEnter={handleMouseEnter} // 마우스가 헤더에 들어올 때
        onMouseLeave={handleMouseLeave} // 마우스가 헤더를 벗어날 때
      >
        <div className="flex h-full items-center">
          <Link href="/">
            <Image
              src="/common/icons/blue_logo_row.svg"
              alt="Linkit"
              width={115}
              height={22}
              className="cursor-pointer"
            />
          </Link>
          <div className="ml-12 flex h-full items-center text-grey60">
            <Link
              href="/"
              className="mt-2 flex items-center border-b-2 border-transparent px-7 pb-2 hover:border-main hover:text-grey100"
            >
              팀원
            </Link>
            <Link
              href="/"
              className="mt-2 flex items-center border-b-2 border-transparent px-7 pb-2 hover:border-main hover:text-grey100"
            >
              팀
            </Link>
            <Link
              href="/"
              className="mt-2 flex items-center border-b-2 border-transparent px-7 pb-2 hover:border-main hover:text-grey100"
            >
              모집 공고
            </Link>
          </div>
        </div>

        <div className="flex items-center font-normal text-grey90">
          <Link className="px-7" href={''}>
            ABOUT US
          </Link>
          <Link className="px-7" href={''}>
            FAQ
          </Link>
          <Link href="/login">
            <button className="rounded-[1.38rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem] font-semibold transition-colors duration-100 hover:bg-main hover:text-white hover:ring-4">
              로그인
            </button>
          </Link>
        </div>
      </header>
    </>
  )
}
