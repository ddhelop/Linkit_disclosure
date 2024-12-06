// src/features/profile/components/ProfileMenu.tsx
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from '@/shared/store/useAuthStore'
import { useState, useEffect } from 'react'
import { getUserBasicInfo } from '@/entities/user/api/userApi'

export default function ProfileMenu() {
  const { logout } = useUserStore()
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

  return (
    <div className="profile-menu absolute right-0 top-12 mt-2 flex flex-col gap-2  rounded-[0.625rem] border border-grey10  bg-white p-3 shadow-lg">
      <Link
        href={`/${emailId}`}
        className="flex items-center gap-3 rounded-[0.38rem] py-1 pl-4 pr-9 text-sm text-gray-700 hover:bg-gray-100"
      >
        <p>내 프로필</p>
      </Link>
      <Link
        href="/my-team"
        className="flex items-center gap-3 rounded-[0.38rem] py-1 pl-4 pr-9 text-gray-700 hover:bg-gray-100"
      >
        <p>나의 팀</p>
      </Link>
      <Link
        href="/profile/account"
        className="flex items-center gap-2 rounded-[0.38rem] py-1 pl-4 pr-9  text-gray-700 hover:bg-gray-100"
      >
        <p>계정 설정</p>
      </Link>
      <button
        onClick={logout}
        className="flex w-full items-center gap-3 rounded-[0.38rem] py-1 pl-4 pr-9 text-left  text-red-600 hover:bg-gray-100"
      >
        <p>로그아웃</p>
      </button>
    </div>
  )
}
