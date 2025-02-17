'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { getAccessToken, useAuthStore } from '@/shared/store/useAuthStore'
import { useEffect, useState } from 'react'
import Logo from './components/Logo'
import Navigation from './components/Navigation'
import UserMenu from './components/UserMenu'
import GuestMenu from './components/GuestMenu'
import MobileMenu from './components/MobileMenu'
import useNotificationSubscription from '@/shared/components/webSocket/useNotificationSubscription'
import useWebSocketStore from '@/shared/store/useWebSocketStore'

export default function Header() {
  const pathname = usePathname()
  const { isLogin, checkLogin, logout, emailId, setLoginState } = useAuthStore()
  const { initializeClient } = useWebSocketStore()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const hideHeaderOnPaths = ['/login/onboarding-info', '/login/onboarding-agree', '/login/onboarding-complete']
  const basePath = pathname.split('?')[0]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = getAccessToken()
      if (accessToken) {
        checkLogin()
        initializeClient(accessToken)
      } else {
        setLoginState(false)
      }
      setLoading(false)
    }
  }, [checkLogin, initializeClient, setLoginState])

  useNotificationSubscription(emailId || '')

  if (hideHeaderOnPaths.includes(basePath)) {
    return null
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-[100] mb-1 flex h-[4rem] w-full justify-between bg-white px-4 text-sm md:px-10">
        <div className="flex h-full items-center">
          <Logo />
          <Navigation />
        </div>

        <div className="flex items-center font-normal text-grey90">
          <div className="hidden md:flex">{isLogin ? <UserMenu /> : <GuestMenu />}</div>

          <button onClick={toggleMobileMenu} className="menu-toggle-button flex md:hidden">
            <Image
              src={isMobileMenuOpen ? '/common/icons/delete_icon.svg' : '/common/icons/mobile_menu_icon.svg'}
              width={26}
              height={26}
              alt="menu"
            />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && <MobileMenu isLogin={isLogin} onClose={closeMobileMenu} onLogout={logout} />}
    </>
  )
}
