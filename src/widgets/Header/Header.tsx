'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from '@/shared/store/useAuthStore'
import { useEffect, useState } from 'react'
import ProfileMenu from './components/ProfileMenu'

export default function Header() {
  const pathname = usePathname()
  const { isLogin, checkLogin, logout } = useUserStore()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // 모바일 메뉴 상태 추가

  const hideHeaderOnPaths = ['/login/onboarding-info', '/login/onboarding-agree', '/login/onboarding-complete']
  const basePath = pathname.split('?')[0]

  useEffect(() => {
    checkLogin()
    setLoading(false)
  }, [isLogin])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (isModalOpen &&
          !(event.target as HTMLElement).closest('.profile-menu') &&
          !(event.target as HTMLElement).closest('.toggle-button')) ||
        (isMobileMenuOpen &&
          !(event.target as HTMLElement).closest('.mobile-menu') &&
          !(event.target as HTMLElement).closest('.menu-toggle-button'))
      ) {
        setIsModalOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen, isMobileMenuOpen])

  if (hideHeaderOnPaths.includes(basePath)) {
    return null
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-[100] flex h-[3.5rem] w-full justify-between bg-white px-4 text-sm md:px-10">
        <div className="flex h-full items-center">
          <Link href="/">
            <Image
              src="/common/icons/blue_logo_row.svg"
              alt="Linkit"
              width={100}
              height={20}
              className="cursor-pointer"
            />
          </Link>
          <div className="ml-12 hidden h-full items-center text-grey60 md:flex">
            <Link
              href="/"
              className="mt-2 flex w-[6.12rem] items-center justify-center border-b-2 border-transparent pb-2 hover:border-main hover:text-grey100"
            >
              팀원
            </Link>
            <Link
              href="/"
              className="mt-2 flex w-[6.12rem] items-center justify-center border-b-2 border-transparent pb-2 hover:border-main hover:text-grey100"
            >
              팀
            </Link>
            <Link
              href="/"
              className="mt-2 flex w-[6.12rem] items-center justify-center border-b-2 border-transparent pb-2 hover:border-main hover:text-grey100"
            >
              모집 공고
            </Link>
          </div>
        </div>

        <div className="flex items-center font-normal text-grey90">
          {loading ? (
            isLogin ? (
              <div className="hidden gap-[1.38rem] md:flex">
                <Link className=" rounded-[1.375rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem] " href="/profile">
                  매칭 관리
                </Link>
                <button
                  className="toggle-button flex rounded-[1.38rem] px-[1.62rem] py-[0.38rem] font-semibold"
                  onClick={toggleModal}
                >
                  마이페이지{' '}
                  <Image
                    src={isModalOpen ? '/common/icons/up_arrow.svg' : '/common/icons/under_arrow.svg'}
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </button>
                {isModalOpen && <ProfileMenu />}
              </div>
            ) : (
              <div className="hidden gap-[1.38rem] font-semibold md:flex">
                <button className="px-7"></button>
              </div>
            )
          ) : isLogin ? (
            <div className="relative hidden gap-[1.38rem] md:flex">
              <div className="flex items-center">
                <Link className="rounded-[1.375rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem] " href="/profile">
                  매칭 관리
                </Link>
              </div>

              <button
                className="toggle-button flex items-center rounded-[1.38rem] px-[1.62rem] py-[0.38rem] "
                onClick={toggleModal}
              >
                <p>마이페이지</p>
                <Image
                  src={isModalOpen ? '/common/icons/up_arrow.svg' : '/common/icons/under_arrow.svg'}
                  width={24}
                  height={24}
                  alt="arrow"
                />
              </button>

              {isModalOpen && <ProfileMenu />}
            </div>
          ) : (
            <div className="hidden items-center gap-[1.38rem] font-normal  md:flex">
              <Link className="px-4 text-grey50 hover:text-black" href="">
                ABOUT US
              </Link>
              <Link className="px-4 text-grey50 hover:text-black" href="">
                FAQ
              </Link>
              <Link href="/login">
                <button className="rounded-[1.38rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem] font-semibold transition-colors duration-100 hover:bg-main hover:text-white hover:ring-4">
                  로그인
                </button>
              </Link>
            </div>
          )}

          {/* 모바일 메뉴 아이콘 */}
          <button onClick={toggleMobileMenu} className="menu-toggle-button flex md:hidden">
            <Image
              src={isMobileMenuOpen ? '/common/icons/delete_icon.svg' : '/common/icons/mobile_menu_icon.svg'}
              width={26}
              height={26}
              alt="menu"
            />
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="mobile-menu absolute left-1 top-[3.8rem] z-50 flex w-[99%] rounded-lg bg-white px-6 py-4 shadow-sm md:hidden">
          {isLogin ? (
            <div className="w-full space-y-4">
              <Link href="/profile" className="flex gap-3 text-sm text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/member_icon.svg'} width={14} height={14} alt="profile" />
                팀원
              </Link>
              <Link href="/profile" className="flex gap-3  text-sm  text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />팀
              </Link>
              <Link href="/profile" className="flex gap-3  text-sm  text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />
                모집 공고
              </Link>
              <hr />
              <Link href="/profile" className="flex gap-3  text-sm  text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/myprofile_icon.svg'} width={14} height={14} alt="profile" />내 프로필
              </Link>
              <Link href="/profile" className="flex gap-3  text-sm  text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/myteam_icon.svg'} width={14} height={14} alt="team" />
                나의 팀
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu()
                  logout()
                }}
                className="flex w-full gap-3 text-left text-sm text-gray-700"
              >
                <Image src={'/common/icons/bye_icon.svg'} width={14} height={14} alt="logout" />
                로그아웃
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <Link href="/profile" className="flex gap-3 text-sm text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/member_icon.svg'} width={14} height={14} alt="profile" />
                팀원
              </Link>
              <Link href="/profile" className="flex gap-3  text-sm  text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />팀
              </Link>
              <Link href="/profile" className="flex gap-3  text-sm  text-gray-700" onClick={closeMobileMenu}>
                <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />
                모집 공고
              </Link>
              <hr />

              <Link
                href="/login"
                className="flex w-full justify-center rounded-lg  border border-grey30 py-2 text-sm text-grey70"
                onClick={closeMobileMenu}
              >
                로그인
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )
}
