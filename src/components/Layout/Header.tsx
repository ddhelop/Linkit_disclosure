'use client'
import { useState, useEffect } from 'react'
import './Example.css' // CSS 스타일은 파일에 포함되어 있어야 합니다.
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setAuthData, clearAuthData, initializeAuth } from '@/features/auth/authSlice'
import { fetchWithCredentials } from '@/lib/fetchHelpers'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector((state) => state.auth)

  const pathname = usePathname()
  const paths = [
    '/login',
    '/onBoarding',
    '/onBoarding/step1',
    '/onBoarding/step2',
    '/onBoarding/step2/person',
    '/onBoarding/step2/team',
    '/onBoarding/step3/person',
  ]

  useEffect(() => {
    // 컴포넌트가 마운트될 때 Redux 상태 초기화
    dispatch(initializeAuth())
  }, [dispatch])

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
          setAuthData({
            accessToken: data.accessToken,
            email: 'email@example.com', // 필요에 따라 수정
            memberBasicInform: {}, // 필요에 따라 수정
          }),
        )
      } catch (error) {
        console.error('Failed to refresh token', error)
      }
    }

    refreshTokenCheck()
  }, [accessToken, dispatch])

  const handleLogout = async () => {
    if (!accessToken) return // accessToken이 없는 경우 실행하지 않음

    try {
      await fetchWithCredentials('https://dev.linkit.im/logout', 'DELETE', accessToken)
      dispatch(clearAuthData())
      window.location.href = '/' // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  if (paths.includes(pathname)) return null

  return (
    <nav className="fixed top-0 z-[100] w-full flex-shrink bg-white-alpha-20 shadow-soft-shadow backdrop-blur-lg">
      <div className="mx-auto flex max-w-full items-center justify-between p-[16px] lg:p-6 lg:pl-40 lg:pr-20">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/assets/icons/headerLogo.svg" width={110} height={20} alt="logo" />
          </Link>
        </div>
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
        <div className="flex gap-10 lg:flex-1 lg:justify-end">
          <Link href="/" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
            링킷 소개
          </Link>
          <Link href="#" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
            FAQ
          </Link>
          {/* 액세스토큰 유무 UI  */}
          {accessToken ? (
            <>
              <Image src="/assets/icons/user.svg" width={17} height={20} alt="user" />
              <button onClick={handleLogout} className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
                123
              </button>
            </>
          ) : (
            <Link href="/login" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
              로그인
            </Link>
          )}
        </div>
        <div className="ml-auto flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-grey100"
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
