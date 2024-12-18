'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TeamInfo from './TeamInfo'

export default function TeamViewClient() {
  const pathname = usePathname()

  // 선택된 메뉴의 스타일
  const selectedStyle = 'flex cursor-pointer rounded-xl px-6 py-4 text-sm text-grey90 bg-grey20 font-semibold'
  // 기본 메뉴 스타일
  const defaultStyle = 'flex cursor-pointer rounded-xl px-6 py-4 text-sm text-grey60 hover:bg-grey20'

  return (
    <div className="flex flex-col">
      {/* 그라데이션 영역 */}
      <div
        className="flex h-[22.4rem] flex-col px-[7.12rem] py-8"
        style={{ background: 'linear-gradient(180deg, #D3E1FE -16.67%, #FFFFFF 100%)' }}
      >
        <TeamInfo />
        {/* 팀 정보 영역 */}
        <div className="flex gap-6 pt-[4.69rem]">
          <Link href="/team/123/log" className={pathname.includes('/log') ? selectedStyle : defaultStyle}>
            팀 로그
          </Link>
          <Link href="/team/123/recruit" className={pathname.includes('/recruit') ? selectedStyle : defaultStyle}>
            모집 공고
          </Link>
          <Link href="/team/123/members" className={pathname.includes('/members') ? selectedStyle : defaultStyle}>
            팀 구성원
          </Link>
          <Link href="/team/123/products" className={pathname.includes('/products') ? selectedStyle : defaultStyle}>
            프로덕트
          </Link>
          <Link href="/team/123/history" className={pathname.includes('/history') ? selectedStyle : defaultStyle}>
            연혁
          </Link>
        </div>
      </div>
    </div>
  )
}
