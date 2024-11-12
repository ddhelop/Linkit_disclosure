'use client'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ProfileEditLog() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu((prev) => !prev)
  }

  const closeMenu = (e: MouseEvent) => {
    if (e.target instanceof Node && !document.getElementById('menu')?.contains(e.target)) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', closeMenu)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setShowMenu(false)
        }
      })
    } else {
      document.removeEventListener('click', closeMenu)
    }

    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [showMenu])

  return (
    <div>
      <Link href="/profile/edit/log/new">
        <Button
          mode="main"
          animationMode="main"
          className="flex w-full items-center justify-center gap-[0.68rem] rounded-lg bg-[#4D82F3] px-5 py-2 text-sm font-semibold text-white"
        >
          <Image src="/common/icons/plus.svg" width={14} height={14} alt="plus" />
          <p>새 글 쓰기</p>
        </Button>
      </Link>

      {/* 로그 리스트 */}
      <div className="flex flex-col pt-1">
        {/* 항목 */}
        <div className="group relative flex rounded-xl px-5 py-6 hover:bg-grey10">
          <div className="flex cursor-pointer items-center gap-2">
            <span className="font-semibold text-grey80">제목제목제목제목</span>
            <span className="text-xs font-normal text-grey60">| 2024.10.27</span>
          </div>

          {/* 수정, 삭제, 더보기 버튼 */}
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 gap-2 pr-6  duration-100 ">
            <Image
              src="/common/icons/more_row.svg"
              width={22}
              height={22}
              alt="more"
              className="cursor-pointer"
              onClick={toggleMenu}
            />
          </div>

          {/* 메뉴창 */}
          {showMenu && (
            <div
              id="menu"
              className="absolute right-0 mt-2 flex w-32 flex-col rounded-lg border border-grey40 bg-white p-2 shadow-lg"
            >
              <div className="cursor-pointer px-2 py-2 text-sm text-grey70 hover:bg-grey10">수정하기</div>
              <div className="cursor-pointer px-2 py-1 text-sm text-grey70 hover:bg-grey10">공개/비공개</div>
              <div className="cursor-pointer px-2 py-1 text-sm text-grey70 hover:bg-grey10">대표글로 설정</div>
              <div className="cursor-pointer px-2 py-1 text-sm text-[#FF345F] hover:bg-grey10">삭제하기</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
