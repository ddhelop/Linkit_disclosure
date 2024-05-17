'use client'

import './Example.css' // CSS 스타일은 이전에 설명한 내용을 조금 수정하며 파일에 포함되어 있어야 합니다.
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsList } from 'react-icons/bs'

export default function OnBoardingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#fff] shadow-soft-shadow">
      <nav className="mx-auto flex max-w-full items-center justify-between p-6 lg:pl-40 lg:pr-20" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/assets/icons/headerLogo.svg" width={110} height={20} alt="logo" />
          </Link>
        </div>

        <div className="flex gap-10 lg:flex-1 lg:justify-end">
          <Link href="#" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
            링킷 소개
          </Link>
          <Link href="/FAQ" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
            FAQ
          </Link>
          <Link href="/login" className="hidden text-sm font-medium leading-5 text-grey100 lg:flex">
            로그인
          </Link>
        </div>
        <div className="ml-auto flex lg:hidden">
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
        className={`mobile-menu transition-max-height absolute w-full duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
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
    </header>
  )
}
