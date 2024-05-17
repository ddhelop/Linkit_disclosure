'use client'
import { useState } from 'react'
import './Example.css' // CSS 스타일은 이전에 설명한 내용을 조금 수정하며 파일에 포함되어 있어야 합니다.
import Image from 'next/image'
import { BsList } from 'react-icons/bs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  const paths = [
    '/login',
    '/onBoarding',
    '/onBoarding/step1',
    '/onBoarding/step2',
    '/onBoarding/step2/person',
    '/onBoarding/step2/team',
    '/onBoarding/step3',
  ]

  if (paths.includes(pathname)) return null

  return (
    <header className="bg-[#fff] shadow-soft-shadow">
      <nav className="mx-auto flex max-w-full items-center justify-between p-6 lg:pl-40 lg:pr-20" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/assets/icons/headerLogo.svg" width={110} height={20} alt="logo" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-between lg:items-center">
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
        <div className="flex lg:flex-1 lg:justify-end gap-10">
          <Link href="/" className="hidden lg:flex text-sm font-medium leading-5 text-grey100">
            링킷 소개
          </Link>
          <Link href="#" className="hidden lg:flex text-sm font-medium leading-5 text-grey100">
            FAQ
          </Link>
          <Link href="/login" className="hidden lg:flex text-sm font-medium leading-5 text-grey100">
            로그인
          </Link>
        </div>

        <div className="flex lg:hidden ml-auto">
          <button
            type="button"
            className=" -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-grey100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <BsList size="2rem" />
          </button>
        </div>
      </nav>
      <div
        className={`mobile-menu absolute w-full transition-max-height duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <Link href="#" className="block text-sm font-semibold leading-6 text-grey100 p-4 pl-8">
          창업/공모전 소개
        </Link>
        <Link href="#" className="block text-sm font-semibold leading-6 text-grey100 p-4 pl-8">
          팀원 찾기
        </Link>
        <Link href="#" className="block text-sm font-semibold leading-6 text-grey100 p-4 pl-8">
          팀 찾기
        </Link>
      </div>
    </header>
  )
}
