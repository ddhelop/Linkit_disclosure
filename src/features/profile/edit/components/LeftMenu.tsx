'use client'
// LeftMenu.tsx
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const menuItems = [
  { label: '미니 프로필', path: '/profile/edit/basic' },
  { label: '보유 스킬', path: '/profile/edit/skills' },
  { label: '이력', path: '/profile/edit/history' },
  { label: '포트폴리오', path: '/profile/edit/portfolio' },
  { label: '학력', path: '/profile/edit/education' },
  { label: '수상', path: '/profile/edit/awards' },
  { label: '자격증', path: '/profile/edit/certifications' },
  { label: '링크', path: '/profile/edit/links' },
]

const LeftMenu = () => {
  const router = useRouter()
  const pathname = usePathname() // 현재 경로를 가져옵니다.

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="mt-12 w-[17.5rem]">
      {/* 나의 로그 */}
      <Link
        href={'/profile/edit/log'}
        className="flex cursor-pointer flex-col rounded-xl border border-[#7EA5F8] bg-grey20 py-3 pl-6 pr-3 hover:ring-4 hover:ring-grey40 hover:brightness-95"
      >
        <div className="flex justify-between">
          <h2 className="text-main">나의 로그</h2>
          <Image src="/common/icons/right_arrow_grey60.svg" width={24} height={24} alt="arrow-right" />
        </div>

        <span className="mt-2 text-xs font-normal leading-5 text-grey60">
          나의 로그에서는 나를 기록하고 소개할 수 있어요.
          <br /> 다른 사람들에게 나를 어필해 보세요!
        </span>
      </Link>

      {/* 왼쪽 메뉴바 - 프로필 관리*/}
      <div className="mt-5 flex w-full flex-col">
        <label className="rounded-xl bg-grey20 px-6 py-3">프로필 관리</label>
        <ul className="flex w-full flex-col items-end gap-1 pl-3 pr-6 pt-3">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path // 현재 경로가 메뉴 항목 경로와 일치하는지 확인
            return (
              <li
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`relative mt-2 flex w-[90%] cursor-pointer items-center justify-between rounded-lg py-[0.31rem] pl-4 pr-2 hover:bg-grey20 ${
                  isActive ? 'font-semibold text-main' : 'text-grey80'
                }`}
              >
                {isActive && <span className="absolute left-0 h-[70%] w-[3px]  bg-main"></span>}
                <span>{item.label}</span>
                <div className="ml-2 h-[1.25rem] w-[1.25rem] rounded-full border border-grey40"></div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 왼쪽 메뉴바 - 계정 설정 */}
      <div className="mt-5 flex w-full flex-col">
        <label className="rounded-xl bg-grey20 px-6 py-3">계정 관리</label>
        <ul className="flex w-full flex-col items-end gap-1 pt-3">
          <li
            onClick={() => handleNavigation('/settings')}
            className={`relative mt-2 flex w-[90%] cursor-pointer items-center justify-between py-[0.31rem] pl-4 pr-8 ${
              pathname === '/settings' ? 'font-semibold text-main' : 'text-grey80'
            }`}
          >
            {pathname === '/settings' && <span className="absolute left-0 h-full w-1 rounded-full bg-main"></span>}
            <span>계정 설정</span>
            <div className="ml-2 hidden h-[1.25rem] w-[1.25rem] rounded-full border border-grey40"></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LeftMenu
