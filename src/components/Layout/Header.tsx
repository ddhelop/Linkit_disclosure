'use client'
import { useState } from 'react'
import './Example.css' // CSS 스타일은 이전에 설명한 내용을 조금 수정하며 파일에 포함되어 있어야 합니다.
import Image from 'next/image'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#fff] shadow-soft-shadow">
      <nav className="mx-auto flex max-w-full items-center justify-between p-6 lg:pl-40 lg:pr-20" aria-label="Global">
        <div className="flex w-10 lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 max-w-[120px]">
            <Image className="h-8 w-auto" src="/assets/icons/headerLogo.svg" width={110} height={20} alt="logo" />
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-between lg:items-center">
          <a href="#" className="text-lg font-medium leading-5 text-grey100">
            창업/공모전 정보
          </a>
          <a href="#" className="text-lg font-medium leading-5 text-grey100">
            팀원 찾기
          </a>
          <a href="#" className="text-lg font-medium leading-5 text-grey100">
            팀 찾기
          </a>
        </div>
        <div className="flex lg:flex-1 lg:justify-end gap-10">
          <a href="#" className="text-sm font-medium leading-5 text-grey100">
            링킷 소개
          </a>
          <a href="#" className="text-sm font-medium leading-5 text-grey100">
            FAQ
          </a>
          <a href="#" className="text-sm font-medium leading-5 text-grey100">
            로그인
          </a>
        </div>
        <div className="flex lg:hidden ml-auto">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle main menu</span>
          </button>
        </div>
      </nav>
      <div
        className={`mobile-menu absolute w-full transition-max-height duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <a href="#" className="block text-sm font-semibold leading-6 text-gray-900 py-2">
          Features
        </a>
        <a href="#" className="block text-sm font-semibold leading-6 text-gray-900 py-2">
          Marketplace
        </a>
        <a href="#" className="block text-sm font-semibold leading-6 text-gray-900 py-2">
          Company
        </a>
      </div>
    </header>
  )
}
