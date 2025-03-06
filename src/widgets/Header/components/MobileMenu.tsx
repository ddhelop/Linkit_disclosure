// src/widgets/Header/components/MobileMenu.tsx
'use client'

import { useAuthStore } from '@/shared/store/useAuthStore'
import Image from 'next/image'
import Link from 'next/link'

interface MobileMenuProps {
  isLogin: boolean
  onClose: () => void
  onLogout: () => void
}

export default function MobileMenu({ isLogin, onClose, onLogout }: MobileMenuProps) {
  const { emailId } = useAuthStore()

  return (
    <div
      className="mobile-menu fixed left-1 right-1 top-[4rem] z-50 flex w-[99%] rounded-lg bg-white px-6 py-4 shadow-sm md:hidden"
      role="menu"
    >
      {isLogin ? (

        <ul className="w-full space-y-4" role="menubar">
          <li role="none">
            <Link href="/find/private" className="flex gap-3 text-sm text-gray-700" onClick={onClose} role="menuitem">
              <Image src={'/common/icons/member_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>팀원</span>
            </Link>
          </li>
          <li role="none">
            <Link href="/find/team" className="flex gap-3 text-sm text-gray-700" onClick={onClose} role="menuitem">
              <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>팀</span>
            </Link>
          </li>
          <li role="none">
            <Link
              href="/find/announcement"
              className="flex gap-3 text-sm text-gray-700"
              onClick={onClose}
              role="menuitem"
            >
              <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>모집 공고</span>
            </Link>
          </li>
          <li role="separator">
            <hr aria-hidden="true" />
          </li>
          <li role="none">
            <Link href={`/${emailId}`} className="flex gap-3 text-sm text-gray-700" onClick={onClose} role="menuitem">
              <Image src={'/common/icons/myprofile_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>내 프로필</span>
            </Link>
          </li>
          <li role="none">
            <Link href="/team/select" className="flex gap-3 text-sm text-gray-700" onClick={onClose} role="menuitem">
              <Image src={'/common/icons/myteam_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>나의 팀</span>
            </Link>
          </li>
          <li role="none">
            <Link href="/match/inbox" className="flex gap-3 text-sm text-gray-700" onClick={onClose} role="menuitem">
              <Image src={'/common/icons/inbox.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>매칭 관리</span>
            </Link>
          </li>
          <li role="none">
            <Link
              href="/profile/account"
              className="flex gap-3 text-sm text-gray-700"
              onClick={onClose}
              role="menuitem"
            >
              <Image src={'/common/icons/account_option.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>계정 설정</span>
            </Link>
          </li>
          <li role="none">
            <button
              onClick={() => {
                onClose()
                onLogout()
              }}
              className="flex w-full gap-3 text-left text-sm text-gray-700"
              role="menuitem"
            >
              <Image src={'/common/icons/bye_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>로그아웃</span>
            </button>
          </li>
        </ul>

      ) : (
        <ul className="w-full space-y-4" role="menubar">
          <li role="none">
            <Link href="/find/private" className="flex gap-3 text-sm text-gray-700" onClick={onClose} role="menuitem">
              <Image src={'/common/icons/member_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>팀원</span>
            </Link>
          </li>
          <li role="none">
            <Link href="/find/team" className="flex gap-3 text-sm text-gray-700" onClick={onClose} role="menuitem">
              <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>팀</span>
            </Link>
          </li>
          <li role="none">
            <Link
              href="/find/announcement"
              className="flex gap-3 text-sm text-gray-700"
              onClick={onClose}
              role="menuitem"
            >
              <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="" aria-hidden="true" />
              <span>모집 공고</span>
            </Link>
          </li>
          <li role="separator">
            <hr aria-hidden="true" />
          </li>
          <li role="none">
            <Link
              href="/login"
              className="flex w-full justify-center rounded-lg border border-grey30 py-2 text-sm text-grey70"
              onClick={onClose}
              role="menuitem"
            >
              로그인
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}
