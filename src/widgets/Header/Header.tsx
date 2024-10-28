// src/widgets/Header/Header.tsx
'use client'

import { useMobileMenu } from './hooks/useMobileMenu'

import { useAuthHandler } from './hooks/useAuthHandler'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  // const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
  // const { isAuth, isLoginModalOpen, openLoginModal, closeLoginModal, handleLogout } = useAuthHandler()

  const pathname = usePathname()

  // 📌 특정 경로에서 Header를 숨기기
  const hideHeaderOnPaths = ['/login/onboarding-info', '/login/onboarding-agree', '/login/onboarding-complete']
  const basePath = pathname.split('?')[0] // 쿼리 파라미터 제거된 경로 확인

  if (hideHeaderOnPaths.includes(basePath)) {
    return null
  }

  return (
    <>
      <header className="relative z-[100] flex h-[4.3rem] w-screen shrink-0 items-center justify-between px-10">
        <div className="flex h-full items-center">
          <Image
            src="/common/icons/blue_logo_row.svg"
            alt="Linkit"
            width={115}
            height={22}
            className="cursor-pointer"
          />
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
          <button className="rounded-[1.38rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem] font-semibold transition-colors duration-100 hover:bg-main hover:text-white hover:ring-4">
            로그인
          </button>
        </div>
      </header>
    </>
  )
}
