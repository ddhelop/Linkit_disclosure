'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TeamInfo from './TeamInfo'

export default function TeamViewClient({ params }: { params: { teamName: string } }) {
  const pathname = usePathname()
  const teamName = params.teamName

  // 선택된 메뉴의 스타일
  const selectedStyle = 'flex cursor-pointer rounded-xl px-6 py-4 text-sm text-grey90 bg-grey20 font-semibold '
  // 기본 메뉴 스타일
  const defaultStyle = 'flex cursor-pointer rounded-xl px-6 py-4 text-sm text-grey60 hover:bg-grey20'

  // /team/{teamName}/log/{id} 또는 /team/{teamName}/recruit/{id} 패턴 매칭
  const pattern = /^\/team\/[^/]+\/(log|recruit)\/[^/]+$/

  if (pathname && pattern.test(pathname)) {
    return <></> // 해당 패턴에 맞으면 빈 컴포넌트 반환
  }

  return (
    <div className="flex flex-col">
      {/* 그라데이션 영역 */}
      <div
        className="flex flex-col px-5 py-8 lg:px-[7.12rem]"
        style={{ background: 'linear-gradient(180deg, #D3E1FE -16.67%, #FFFFFF 100%)' }}
      >
        <TeamInfo params={{ teamName }} />
        {/* 팀 정보 영역 - 가로 스크롤을 위한 컨테이너 */}
        <div className="webkit-scrollbar-hide w-full overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max pt-10 text-sm md:gap-6 md:text-base lg:pt-[4.69rem]">
            <Link href={`/team/${teamName}/log`} className={pathname.includes('/log') ? selectedStyle : defaultStyle}>
              팀 로그
            </Link>
            <Link
              href={`/team/${teamName}/recruit`}
              className={pathname.includes('/recruit') ? selectedStyle : defaultStyle}
            >
              모집 공고
            </Link>
            <Link
              href={`/team/${teamName}/members`}
              className={pathname.includes('/members') ? selectedStyle : defaultStyle}
            >
              팀 구성원
            </Link>
            <Link
              href={`/team/${teamName}/products`}
              className={pathname.includes('/products') ? selectedStyle : defaultStyle}
            >
              프로덕트
            </Link>
            <Link
              href={`/team/${teamName}/history`}
              className={pathname.includes('/history') ? selectedStyle : defaultStyle}
            >
              연혁
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
