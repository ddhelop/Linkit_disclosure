// src/features/profile/components/ProfileMenu.tsx
import Image from 'next/image'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import { getUserBasicInfo } from '@/entities/user/api/userApi'
import { useAuthStore } from '@/shared/store/useAuthStore'

interface ProfileMenuProps {
  onClose: () => void
}

export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  const { logout } = useAuthStore()
  const [emailId, setEmailId] = useState<string>('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserBasicInfo()
        setEmailId(userInfo.emailId)
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }
    fetchUserInfo()
  }, [])

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div className="absolute right-0 top-12 mt-2 flex w-[8rem] flex-col gap-2 rounded-[0.625rem] border border-grey10 bg-white p-3 shadow-lg">
      <Link
        href={`/${emailId}`}
        className="flex w-full items-center gap-3 whitespace-nowrap rounded-[0.38rem] py-1 pl-4 pr-9 text-sm text-grey80 hover:bg-gray-100"
        onClick={handleLinkClick}
      >
        <p>내 프로필</p>
      </Link>
      <Link
        href="/team/select"
        className="flex w-full items-center gap-3 whitespace-nowrap rounded-[0.38rem] py-1 pl-4 pr-9 text-sm text-grey80 hover:bg-gray-100"
        onClick={handleLinkClick}
      >
        <p>나의 팀</p>
      </Link>
      <Link
        href="/match/inbox"
        className="flex w-full items-center gap-2 whitespace-nowrap rounded-[0.38rem] py-1 pl-4 pr-9 text-sm text-grey80 hover:bg-gray-100"
        onClick={handleLinkClick}
      >
        <p>매칭 관리</p>
      </Link>
      <Link
        href="/profile/account"
        className="flex w-full items-center gap-2 whitespace-nowrap rounded-[0.38rem] py-1 pl-4 pr-9 text-sm text-grey80 hover:bg-gray-100"
        onClick={handleLinkClick}
      >
        <p>계정 설정</p>
      </Link>
      <button
        onClick={() => {
          logout()
          onClose()
        }}
        className="flex w-full items-center gap-3 rounded-[0.38rem] py-1 pl-4 pr-9 text-left text-sm text-red-600 hover:bg-gray-100"
      >
        <p>로그아웃</p>
      </button>
    </div>
  )
}
