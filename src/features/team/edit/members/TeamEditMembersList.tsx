'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import { Button } from '@/shared/ui/Button/Button'
import { AddMemberModal } from './AddMemberModal'

export default function TeamEditMembersList() {
  const [showMenu, setShowMenu] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setShowMenu(false),
    isEnabled: showMenu,
  })

  return (
    <div className=" flex w-full flex-col gap-5">
      <Button
        mode="main2"
        animationMode="main"
        className="mt-5 w-full rounded-[0.69rem] py-2"
        onClick={() => setShowAddModal(true)}
      >
        + 추가하기
      </Button>

      <AddMemberModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />

      {/* 각 요소 */}
      <div className="flex items-center justify-between rounded-xl bg-white px-9 py-5">
        <div className="flex items-center gap-5">
          <Image src="/common/default_profile.svg" width={52} height={52} alt="back" />
          <div className="flex gap-2">
            <span className="flex font-semibold text-grey80">이름</span>
            <span className="text-sm text-grey50">|</span>
            <span className="flex text-sm text-grey80">포지션</span>
          </div>
        </div>
        <div className="relative">
          <div ref={buttonRef} onClick={() => setShowMenu(!showMenu)} className="cursor-pointer">
            <Image src="/common/icons/more_row.svg" width={24} height={24} alt="menu" />
          </div>

          {/* 드롭다운 메뉴 */}
          {showMenu && (
            <div ref={menuRef} className="absolute left-0 top-8 z-10 min-w-[120px] rounded-lg bg-white py-2 shadow-lg">
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-grey80 hover:bg-grey20"
                onClick={() => {
                  // 관리자로 설정 로직
                  setShowMenu(false)
                }}
              >
                관리자로 설정
              </button>

              <button
                className="text-red flex w-full items-center px-4 py-2 text-sm text-[#FF345F] hover:bg-grey20"
                onClick={() => {
                  // 추방하기 로직
                  setShowMenu(false)
                }}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
