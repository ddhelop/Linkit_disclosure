// src/features/profile/components/ProfileMenu.tsx
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from '@/shared/store/useAuthStore'

export default function ProfileMenu() {
  const { logout } = useUserStore()

  return (
    <div className="profile-menu absolute right-0 top-12 mt-2 flex  flex-col rounded-[0.625rem] border  border-grey10 bg-white shadow-lg">
      <Link href="/profile" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100">
        <Image src="/common/icons/user_profile.svg" width={18} height={18} alt="profile icon" />
        <p>내 프로필</p>
      </Link>
      <Link href="/my-team" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-100">
        <Image src="/common/icons/menu.svg" width={18} height={18} alt="team icon" />
        <p>나의 팀</p>
      </Link>
      <button
        onClick={logout}
        className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-red-600 hover:bg-gray-100"
      >
        <Image src="/common/icons/logout.svg" width={18} height={18} alt="logout icon" />
        <p>로그아웃</p>
      </button>
    </div>
  )
}
