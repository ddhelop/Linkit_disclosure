'use client'
import { useState } from 'react'
import './Example.css' // CSS 스타일은 이전에 설명한 내용을 조금 수정하며 파일에 포함되어 있어야 합니다.
import Image from 'next/image'
import { BsList } from 'react-icons/bs'
import { usePathname } from 'next/navigation'

export default function Header() {
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
    <nav className="w-full bg-white-alpha-20 shadow-soft-shadow backdrop-blur-lg flex-shrink fixed top-0 z-50">
      <nav className="mx-auto flex max-w-full items-center justify-between p-6 lg:pl-40 lg:pr-20">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <Image src="/assets/icons/headerLogo.svg" width={110} height={20} alt="logo" />
          </a>
        </div>
        {/* <div className="flex lg:flex-1 lg:justify-end gap-10">
          <a href="#" className="hidden lg:flex text-sm font-medium leading-5 text-grey100">
            링킷 소개
          </a>
          <a href="#" className="hidden lg:flex text-sm font-medium leading-5 text-grey100">
            FAQ
          </a>
          <a href="/login" className="hidden lg:flex text-sm font-medium leading-5 text-grey100">
            로그인
          </a>
        </div> */}
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
        <a href="#" className="block text-sm font-semibold leading-6 text-grey100 p-4 pl-8">
          창업/공모전 소개
        </a>
        <a href="#" className="block text-sm font-semibold leading-6 text-grey100 p-4 pl-8">
          팀원 찾기
        </a>
        <a href="#" className="block text-sm font-semibold leading-6 text-grey100 p-4 pl-8">
          팀 찾기
        </a>
      </div>
    </nav>
  )
}
