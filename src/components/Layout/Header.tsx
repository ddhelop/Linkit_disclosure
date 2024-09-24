// Header.tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import './Example.css'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import DropdownMenu from './HeaderModal'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { Logout, RefreshAccessToken } from '@/lib/action'
import LoginModal from '../Login/LoginModal'
import PopUpAlertModal from '../common/CommonModal/PopUpAlertModal'
import { motion } from 'framer-motion'
import AccountModal from '../common/user/AccountModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const router = useRouter()
  const [token, setToken] = useRecoilState(accessTokenState)
  const resetAccessTokenState = useResetRecoilState(accessTokenState)
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!token || token === 'undefined') return

    RefreshAccessToken(token)
      .then((response) => {
        if (response.existMemberBasicInform === false) {
          setIsAuth(false)
        }

        if (response.existMemberBasicInform) {
          setToken(response.accessToken)
          setIsAuth(true)
        }

        if (response.code === 9103) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')
          setIsAuth(false)
          setToken(null)
          router.push('/')
        }
      })
      .catch((error) => {
        if (error.code === 9103) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.')
          setIsAuth(false)
          router.push('/')
        }
      })
  }, [router, setToken, setIsAuth, token, pathname])

  // 모바일 설정 모달
  const handleSettingClick = () => {
    setModalOpen(true)
    setDropdownOpen(false)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  const handleLogout = async () => {
    if (!token) return

    try {
      const response = await Logout(token)
      if (response.ok) {
        setIsAuth(false)
        resetAccessTokenState()
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Failed to logout', error)
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="fixed top-0 z-[20] w-full flex-shrink bg-white backdrop-blur-3xl">
        <div className="flex w-full items-center justify-between px-[2.5rem] py-[1.3rem]">
          <div className="flex gap-[2.19rem]">
            <div className="flex">
              <Link href="/" className="-m-1.5 p-1.5">
                <div className="relative h-[20px] w-[110px]">
                  <Image src="/assets/colorLogo.svg" fill style={{ objectFit: 'contain' }} alt="logo" />
                </div>
              </Link>
            </div>

            <div className="hidden gap-[1.88rem] md:flex md:items-center md:justify-between lg:flex-1">
              <Link
                href="#"
                className="font-medium leading-5 text-grey90 hover:text-main"
                onClick={() => setIsAlertModalOpen(true)}
              >
                창업/공모전 정보
              </Link>
              <Link href="/findMember" className="font-medium leading-5 text-grey90 hover:text-main">
                팀원 찾기
              </Link>
              <Link href="/findTeam" className="font-medium leading-5 text-grey90 hover:text-main">
                팀 찾기
              </Link>
            </div>
          </div>

          <div className="flex flex-1 justify-end gap-10">
            {isAuth ? (
              <>
                <Link href="/match/from" className="hidden text-sm font-medium leading-5 text-grey80 md:flex">
                  매칭 관리
                </Link>
                <DropdownMenu />
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden text-sm font-medium leading-5 text-grey80 hover:text-main md:flex"
                >
                  로그인
                </button>

                <Link href="#FAQ" className="hidden text-sm font-medium leading-5 text-grey80 hover:text-main md:flex">
                  FAQ
                </Link>
              </>
            )}
          </div>

          <div className="ml-auto flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-md p-2.5 text-grey100"
              onClick={(e) => {
                e.stopPropagation() // Prevent click event from bubbling up
                setMobileMenuOpen(!mobileMenuOpen) // Toggle the state
              }}
            >
              {mobileMenuOpen ? (
                // Icon when menu is open (X icon)
                <div>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              ) : (
                // Icon when menu is closed (Hamburger icon)
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <motion.div
          ref={menuRef}
          className="mobile-menu transition-max-height absolute z-20 w-full bg-white"
          initial={{ height: 0 }}
          animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isAuth ? (
            <>
              <Link
                href="/myResume"
                className="block p-4 pl-12 text-sm  leading-6 text-grey70"
                onClick={() => setMobileMenuOpen(false)}
              >
                마이페이지
              </Link>
              <Link
                href="/match/from"
                className="block p-4 pl-12 text-sm  leading-6 text-grey70"
                onClick={() => setMobileMenuOpen(false)}
              >
                매칭 관리
              </Link>
              <Link
                href="/findMember"
                className="block p-4 pl-12 text-sm leading-6 text-grey70"
                onClick={() => setMobileMenuOpen(false)}
              >
                팀원 찾기
              </Link>
              <Link
                href="/findTeam"
                className="block p-4 pl-12 text-sm leading-6 text-grey70"
                onClick={() => setMobileMenuOpen(false)}
              >
                팀 찾기
              </Link>
              <Link href="/" className="block p-4 pl-12 text-sm leading-6 text-grey70" onClick={handleSettingClick}>
                설정
              </Link>
              <div
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="block p-4 pl-12 text-sm leading-6 text-grey50"
              >
                로그아웃
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="block w-full p-4 pl-12 text-left text-sm  leading-6 text-grey70"
              >
                로그인
              </button>
              <Link
                href="/findMember"
                className="block p-4 pl-12 text-sm leading-6 text-grey70"
                onClick={() => setMobileMenuOpen(false)}
              >
                팀원 찾기
              </Link>
              <Link
                href="/findTeam"
                className="block p-4 pl-12 text-sm leading-6 text-grey70"
                onClick={() => setMobileMenuOpen(false)}
              >
                팀 찾기
              </Link>
              <Link
                href="#FAQ"
                className="block p-4 pl-12 text-sm leading-6 text-grey70"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </>
          )}
        </motion.div>
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* 모바일 계정 설정 모달 */}
      {modalOpen && <AccountModal onClose={closeModal} />}

      <PopUpAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        text="곧 오픈 예정입니다!"
      />
    </>
  )
}
