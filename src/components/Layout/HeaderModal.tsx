import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Logout } from '@/lib/action'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import AccountModal from '../common/user/AccountModal'

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [token, setToken] = useRecoilState(accessTokenState)
  const resetAccessTokenState = useResetRecoilState(accessTokenState)

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
    if (!token) return // accessToken이 없는 경우 실행하지 않음

    try {
      const response = await Logout(token)
      if (response.ok) {
        resetAccessTokenState()
        window.location.href = '/' // 로그아웃 후 로그인 페이지로 리다이렉트
      }
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  const handleSettingClick = () => {
    setModalOpen(true)
    setDropdownOpen(false)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="hidden cursor-pointer text-sm font-medium leading-5 text-grey80 lg:flex"
      >
        마이페이지
        <Image src="/assets/icons/bottom>.svg" width={7} height={3} alt="arrow-down" className="ml-2" />
      </div>
      {dropdownOpen && (
        <div className="absolute right-[-20px] mt-7 flex w-[7.93rem] flex-col items-center rounded-md bg-[#fff] text-center shadow-lg ring-1 ring-grey40 ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link href="/myResume" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
              마이페이지
            </Link>
            <div
              onClick={handleSettingClick}
              className="text-gray-700 block cursor-pointer px-4 py-2 text-sm"
              role="menuitem"
            >
              설정
            </div>
            <button onClick={handleLogout} className="block w-full py-2 text-sm text-[#FF345F]" role="menuitem">
              로그아웃
            </button>
          </div>
        </div>
      )}
      {modalOpen && <AccountModal onClose={closeModal} />}
    </div>
  )
}

export default DropdownMenu
