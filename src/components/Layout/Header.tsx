'use client'
import { useEffect, useState } from 'react'
import './Example.css' // CSS 스타일은 파일에 포함되어 있어야 합니다.
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import DropdownMenu from './HeaderModal'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { RefreshAccessToken } from '@/lib/action'
import { set } from 'react-hook-form'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const [token, setToken] = useRecoilState(accessTokenState)

  // 액세스토큰 최신화
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken || accessToken === 'undefined') return

    RefreshAccessToken(accessToken)
      .then((newAccessToken) => {
        if (newAccessToken === undefined) {
          alert('로그인이 필요합니다.')
          router.push('/login')
        }
        localStorage.setItem('accessToken', newAccessToken)
        setToken(newAccessToken)
      })
      .catch((error) => {
        console.log(error)
        if (error.code === 9103) {
          router.push('/login')
        }
      })
  }, [router, setToken])

  // 현재 경로 확인 및 숨김 경로 설정
  const pathname = usePathname()
  const paths = ['/login', '']

  if (paths.includes(pathname)) return null

  const hiddenPaths = [
    '/onBoarding/person/project',
    '/onBoarding/person/role',
    '/onBoarding/person/school',
    '/onBoarding/person/location',
    '/onBoarding/person/career',
    '/onBoarding/person/profile',

    '/onBoarding/team/teamCategory',
    '/onBoarding/team/activityWay',
    '/onBoarding/team/member',
    '/onBoarding/team/profile',

    '/onBoarding/complete',
    '/onBoarding',
  ]

  return (
    <nav className="fixed top-0 z-[100] w-full flex-shrink bg-white-alpha-20 shadow-soft-shadow backdrop-blur-lg">
      <div className="mx-auto flex max-w-full items-center justify-between p-[16px] lg:p-6 lg:pl-40 lg:pr-20">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/assets/icons/headerLogo.svg" width={110} height={20} layout="reponsive" alt="logo" />
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
        <div className="flex flex-1 justify-end gap-10">
          {/* 액세스토큰 유무 UI  */}
          {token ? (
            <>
              <Link href="#" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
                매칭관리
              </Link>
              <DropdownMenu accessToken={token} />
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
