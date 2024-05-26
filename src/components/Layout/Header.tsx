'use client'
import { useState, useEffect } from 'react'
import './Example.css' // CSS 스타일은 파일에 포함되어 있어야 합니다.
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setSimpleAuthData, initializeAuth } from '@/features/auth/authSlice'
import DropdownMenu from './HeaderModal'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector((state) => state.auth)

  const pathname = usePathname()
  const paths = ['/login', '']

  useEffect(() => {
    // 컴포넌트가 마운트될 때 Redux 상태 초기화
    dispatch(initializeAuth())
  }, [dispatch])

  // 액세스토큰이 있는 경우에만 실행
  useEffect(() => {
    const refreshTokenCheck = async () => {
      if (!accessToken) return // accessToken이 없는 경우 실행하지 않음

      // API 라우트를 설정하여 Refresh token을 재발급
      try {
        const response = await fetch('https://dev.linkit.im/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include', // 쿠키를 포함시키기 위해 필요
        })

        console.log('Refresh token response:', response)
        const data = await response.json()

        dispatch(
          setSimpleAuthData({
            accessToken: data.accessToken,
          }),
        )
      } catch (error) {
        console.error('Failed to refresh token', error)
      }
    }

    refreshTokenCheck()
  }, [accessToken, dispatch])

  if (paths.includes(pathname)) return null

  const hiddenPaths = [
    '/onBoarding/person/project',
    '/onBoarding/person/role',
    '/onBoarding/person/school',
    '/onBoarding/person/career',
    '/onBoarding/person/profile',

    '/onBoarding/team/teamCategory',
    '/onBoarding/team/activityWay',
    '/onBoarding/team/member',
    '/onBoarding/team/profile',

    '/onBoarding/complete',
  ]

  return (
    <nav className="fixed top-0 z-[100] w-full flex-shrink bg-white-alpha-20 shadow-soft-shadow backdrop-blur-lg">
      <div className="mx-auto flex max-w-full items-center justify-between p-[16px] lg:p-6 lg:pl-40 lg:pr-20">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/assets/icons/headerLogo.svg" width={110} height={20} alt="logo" />
          </Link>
        </div>
        {!hiddenPaths.includes(pathname) && (
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between">
            <Link href="#" className="text-lg font-medium leading-5 text-grey100">
              창업/공모전 정보
            </Link>
            <Link href="#" className="text-lg font-medium leading-5 text-grey100">
              팀원 찾기
            </Link>
            <Link href="#" className="text-lg font-medium leading-5 text-grey100">
              팀 찾기
            </Link>
          </div>
        )}
        <div className="flex gap-10 lg:flex-1 lg:justify-end">
          {/* 액세스토큰 유무 UI  */}
          {accessToken ? (
            <>
              <Link href="#" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
                매칭관리
              </Link>
              <DropdownMenu accessToken={accessToken} />
            </>
          ) : (
            <>
              <Link href="/" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
                링킷 소개
              </Link>
              <Link href="#" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
                FAQ
              </Link>
              <Link href="/login" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
                로그인
              </Link>
            </>
          )}
        </div>
        <div className="ml-auto flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-md p-2.5 text-grey100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* 아이콘 추가할 곳 */}
          </button>
        </div>
      </div>
      <div
        className={`mobile-menu transition-max-height absolute w-full duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <Link href="#" className="block p-4 pl-8 text-sm font-semibold leading-6 text-grey100">
          창업/공모전 소개
        </Link>
        <Link href="#" className="block p-4 pl-8 text-sm font-semibold leading-6 text-grey100">
          팀원 찾기
        </Link>
        <Link href="#" className="block p-4 pl-8 text-sm font-semibold leading-6 text-grey100">
          팀 찾기
        </Link>
      </div>
    </nav>
  )
}
