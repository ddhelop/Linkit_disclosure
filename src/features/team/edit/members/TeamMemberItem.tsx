'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

interface TeamMemberItemProps {
  profileImagePath?: string
  name: string
  position: string
  memberType: 'TEAM_MANAGER' | 'TEAM_VIEWER'
  isPending?: boolean
  email?: string
}

export function TeamMemberItem({
  profileImagePath,
  name,
  position,
  memberType,
  isPending,
  email,
}: TeamMemberItemProps) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setShowMenu(false),
    isEnabled: showMenu,
  })

  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-9 py-5">
      <div className="flex items-center gap-5">
        <Image
          src={profileImagePath || '/common/default_profile.svg'}
          width={52}
          height={52}
          alt="profile"
          className="rounded-lg"
        />
        <div className="flex gap-2">
          <span className="flex font-semibold text-grey80">{isPending ? email : name}</span>
          {!isPending && (
            <>
              <span className="text-sm text-grey50">|</span>
              <span className="flex text-sm text-grey80">{position}</span>
            </>
          )}
          <span className="text-sm text-grey50">
            {isPending ? '(대기중)' : memberType === 'TEAM_MANAGER' ? '(관리자)' : '(멤버)'}
          </span>
        </div>
      </div>
      <div className="relative">
        <div ref={buttonRef} onClick={() => setShowMenu(!showMenu)} className="cursor-pointer">
          <Image src="/common/icons/more_row.svg" width={24} height={24} alt="menu" />
        </div>

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
  )
}
