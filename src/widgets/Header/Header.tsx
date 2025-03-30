'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { getAccessToken, useAuthStore } from '@/shared/store/useAuthStore'
import { useEffect, useState, useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import Logo from './components/Logo'
import Navigation from './components/Navigation'
import UserMenu from './components/UserMenu'
import GuestMenu from './components/GuestMenu'
import MobileMenu from './components/MobileMenu'
import ChatButton from './components/IconButtons/ChatButton'
import NotificationButton from './components/IconButtons/NotificationButton'
import useWebSocketStore from '@/shared/store/useWebSocketStore'

export default function Header() {
  const pathname = usePathname()
  const { isLogin, checkLogin, logout, emailId, setLoginState } = useAuthStore()
  const { initializeClient } = useWebSocketStore()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const hideHeaderOnPaths = ['/login/onboarding-info', '/login/onboarding-agree', '/login/onboarding-complete']
  const basePath = pathname.split('?')[0]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = getAccessToken()
      if (accessToken) {
        checkLogin()
        // initializeClient(accessToken)
      } else {
        setLoginState(false)
      }
      setLoading(false)
    }
  }, [checkLogin, initializeClient, setLoginState])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  useOnClickOutside({
    refs: [mobileMenuRef, menuButtonRef],
    handler: closeMobileMenu,
    isEnabled: isMobileMenuOpen,
  })

  if (hideHeaderOnPaths.includes(basePath)) {
    return null
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className="sticky top-0 z-[100] mb-1 flex h-[4rem] w-full justify-between bg-white px-4 text-sm md:px-10">
        <div className="flex h-full items-center">
          <Logo />
          <Navigation />
        </div>

        <div className="flex items-center gap-4 font-normal text-grey90">
          {isLogin && (
            <div className="flex gap-3 md:hidden">
              <ChatButton />
              <NotificationButton emailId={emailId || ''} />
            </div>
          )}
          <div className="hidden md:flex">{isLogin ? <UserMenu /> : <GuestMenu />}</div>

          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className="menu-toggle-button flex md:hidden"
            aria-label="모바일 메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <Image
              src={isMobileMenuOpen ? '/common/icons/delete_icon.svg' : '/common/icons/mobile_menu_icon.svg'}
              width={26}
              height={26}
              alt="메뉴 아이콘"
            />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <nav ref={mobileMenuRef} aria-label="모바일 메뉴">
          <MobileMenu isLogin={isLogin} onClose={closeMobileMenu} onLogout={logout} />
        </nav>
      )}
    </>
  )
}
