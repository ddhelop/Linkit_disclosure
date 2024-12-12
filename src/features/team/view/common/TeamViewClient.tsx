'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
        {/* 팀 정보가 없을 때 */}
        {/* <div
          className="flex h-full w-full flex-col items-center justify-center rounded-[1.875rem] bg-white bg-opacity-50"
          style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
        >
          <span className="font-semibold text-grey90">앗! 아직 팀프로필이 없어요</span>
          <span className="pt-[0.16rem] text-xs font-normal text-grey60">정보를 입력하고 팀을 생성해 보세요</span>

          <Link href="/team/create" className="mt-6">
            <Button className="rounded-[5rem] px-[5rem] py-2" animationMode="main">
              팀 생성하러 가기
            </Button>
          </Link>
        </div> */}

        {/* 팀 정보가 있을 때 */}
        <div className="flex w-full justify-between">
          {/* 왼쪽 */}
          <div className="flex flex-col">
            <div className="flex gap-2">
              <span className="rounded-[0.38rem] bg-[#4D82F3] px-2 py-1 text-xs text-white">팀 찾는중</span>
              <span className="rounded-[0.38rem] bg-[#4D82F3] px-2 py-1 text-xs text-white">팀원 찾는중</span>
              <span className="rounded-[18.38rem] bg-[#D3E1FE] px-2 py-1 text-xs text-main2">+2</span>
            </div>

            {/* 팀 정보 */}
            <div className="mt-5 flex justify-center">
              <div className="flex gap-8">
                <Image src="/common/default_profile.svg" alt="default-profile" width={132} height={132} />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-grey90">팀이름</h1>
                    <span className="text-xs text-grey70">스크랩 수 : 50</span>
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    <span className="flex gap-2 text-xs text-grey50">
                      팀원 | <span className="text-grey70">5인</span>
                    </span>
                    <span className="flex gap-2 text-xs text-grey50">
                      지역 | <span className="text-grey70">서울시 마포구</span>
                    </span>

                    <span className="mt-2 text-xs text-grey70">
                      한줄소개한소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 오른쪽 버튼들 */}

          <div className="flex flex-col justify-center gap-[1.13rem]">
            <Link
              href="/team/edit"
              className="flex h-[3rem] w-[20rem] items-center justify-center rounded-[62.5rem] bg-[#D3E1FE] font-semibold text-main2"
            >
              팀관리
            </Link>
            <Link
              href="/team/edit"
              className="flex h-[3rem] w-[20rem] items-center justify-center rounded-[62.5rem] bg-[#D3E1FE] font-semibold text-main2"
            >
              팀 추가하기
            </Link>
          </div>
        </div>
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
