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
    <div className="mobile-menu absolute left-1 top-[3.8rem] z-50 flex w-[99%] rounded-lg bg-white px-6 py-4 shadow-sm md:hidden">
      {isLogin ? (
        <div className="w-full space-y-4">
          <Link href="/find/private" className="flex gap-3 text-sm text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/member_icon.svg'} width={14} height={14} alt="profile" />
            팀원
          </Link>
          <Link href="/find/team" className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />팀
          </Link>
          <Link href="/find/announcement" className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />
            모집 공고
          </Link>
          <hr />
          <Link href={`/${emailId}`} className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/myprofile_icon.svg'} width={14} height={14} alt="profile" />내 프로필
          </Link>
          <Link href="/team/select" className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/myteam_icon.svg'} width={14} height={14} alt="team" />
            나의 팀
          </Link>
          <Link href="/match/inbox" className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/inbox.svg'} width={14} height={14} alt="team" />
            매칭 관리
          </Link>
          <Link href="/profile/account" className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/account_option.svg'} width={14} height={14} alt="team" />
            계정 설정
          </Link>

          <button
            onClick={() => {
              onClose()
              onLogout()
            }}
            className="flex w-full gap-3 text-left text-sm text-gray-700"
          >
            <Image src={'/common/icons/bye_icon.svg'} width={14} height={14} alt="logout" />
            로그아웃
          </button>
        </div>
      ) : (
        <div className="w-full space-y-4">
          <Link href="/find/private" className="flex gap-3 text-sm text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/member_icon.svg'} width={14} height={14} alt="profile" />
            팀원
          </Link>
          <Link href="/profile" className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />팀
          </Link>
          <Link href="/find/announcement" className="flex gap-3  text-sm  text-gray-700" onClick={onClose}>
            <Image src={'/common/icons/team_icon.svg'} width={14} height={14} alt="team" />
            모집 공고
          </Link>
          <hr />
          <Link
            href="/login"
            className="flex w-full justify-center rounded-lg  border border-grey30 py-2 text-sm text-grey70"
            onClick={onClose}
          >
            로그인
          </Link>
        </div>
      )}
    </div>
  )
}
