'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from '@/shared/store/useAuthStore'
import { useEffect, useState } from 'react'
import ProfileMenu from './components/ProfileMenu'

export default function Header() {
  const pathname = usePathname()
  const { isLogin, checkLogin } = useUserStore()
  const [loading, setLoading] = useState(true) // 로딩 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 상태 관리

  // 특정 경로에서 Header를 숨기기
  const hideHeaderOnPaths = ['/login/onboarding-info', '/login/onboarding-agree', '/login/onboarding-complete']
  const basePath = pathname.split('?')[0] // 쿼리 파라미터 제거된 경로 확인

  useEffect(() => {
    checkLogin() // 로그인 상태 확인
    setLoading(false) // 로딩 완료
  }, [isLogin])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 모달 외부 클릭 시 닫기
      if (
        isModalOpen &&
        !(event.target as HTMLElement).closest('.profile-menu') &&
        !(event.target as HTMLElement).closest('.toggle-button')
      ) {
        setIsModalOpen(false)
      }
    }

    const handleEscPress = (event: KeyboardEvent) => {
      // ESC 키 누를 시 닫기
      if (event.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscPress)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscPress)
    }
  }, [isModalOpen])

  if (hideHeaderOnPaths.includes(basePath)) {
    return null
  }

  const handleMouseEnter = () => {
    document.body.style.overflow = 'hidden' // 스크롤 비활성화
  }

  const handleMouseLeave = () => {
    document.body.style.overflow = '' // 스크롤 활성화
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <header
        className="sticky top-0 z-[100] flex h-[3.5rem] w-full items-center justify-between bg-white px-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          {loading ? (
            // 로딩 중 UI: 로그인 상태에 따라 다르게 표시
            isLogin ? (
              <div className="flex gap-[1.38rem] font-semibold">
                <Link className="rounded-[1.375rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem]" href="/profile">
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
                {isModalOpen && <ProfileMenu />} {/* ProfileMenu 컴포넌트 */}
              </div>
            ) : (
              // 로딩 중 UI
              <div className="flex gap-[1.38rem] font-semibold">
                <button className="px-7"></button>
              </div>
            )
          ) : isLogin ? (
            // 로그인된 상태 UI
            <div className="relative flex gap-[1.38rem] font-semibold">
              <Link className="rounded-[1.375rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem]" href="/profile">
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
              {isModalOpen && <ProfileMenu />} {/* ProfileMenu 컴포넌트 */}
            </div>
          ) : (
            // 비로그인 상태 UI
            <>
              <Link className="px-7" href="">
                ABOUT US
              </Link>
              <Link className="px-7" href="">
                FAQ
              </Link>
              <Link href="/login">
                <button className="rounded-[1.38rem] bg-[#D3E1FE] px-[1.62rem] py-[0.38rem] font-semibold transition-colors duration-100 hover:bg-main hover:text-white hover:ring-4">
                  로그인
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  )
}
