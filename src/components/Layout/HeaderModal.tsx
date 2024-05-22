import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch } from '@/hooks'
import { clearAuthData } from '@/features/auth/authSlice'
import { fetchWithCredentials } from '@/lib/fetchHelpers'

const DropdownMenu = ({ accessToken }: { accessToken: string }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [dropdownOpen])

  const handleLogout = async () => {
    if (!accessToken) return // accessToken이 없는 경우 실행하지 않음

    try {
      await fetchWithCredentials('https://dev.linkit.im/logout', 'DELETE', accessToken)
      dispatch(clearAuthData())
      window.location.href = '/' // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <Image
        src="/assets/icons/user.svg"
        width={17}
        height={20}
        alt="user"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer"
      />
      {dropdownOpen && (
        <div className="absolute right-0 mt-7 flex w-[7.93rem] flex-col items-center rounded-md bg-[#fff] text-center shadow-lg ring-1 ring-grey40 ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
              마이페이지
            </Link>
            <Link href="#FAQ" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
              FAQ
            </Link>
            <Link href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
              설정
            </Link>
            <button onClick={handleLogout} className="block w-full py-2 text-sm text-[#FF345F]" role="menuitem">
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
