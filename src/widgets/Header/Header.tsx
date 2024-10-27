// src/widgets/Header/Header.tsx
'use client'

import { useMobileMenu } from './hooks/useMobileMenu'

import NavigationLinks from './components/NavigationLinks'
import MobileMenu from './components/MobileMenu'
import AccountModal from '@/components/common/user/AccountModal'
import PopUpAlertModal from '@/components/common/CommonModal/PopUpAlertModal'
import LoginModal from '@/features/login/components/LoginModal'
import { useAuthHandler } from './hooks/useAuthHandler'

export default function Header() {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
  const { isAuth, isLoginModalOpen, openLoginModal, closeLoginModal, handleLogout } = useAuthHandler()

  return (
    <>
      <nav className="fixed top-0 z-[20] w-full flex-shrink bg-white backdrop-blur-3xl">
        <div className="flex w-full items-center justify-between px-[2.5rem] py-[1.3rem]">
          <NavigationLinks isAuth={isAuth} openLoginModal={openLoginModal} />

          <div className="ml-auto flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-md p-2.5 text-grey100"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        <MobileMenu isAuth={isAuth} handleLogout={handleLogout} isOpen={mobileMenuOpen} closeMenu={closeMobileMenu} />
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <AccountModal onClose={() => {}} />
      <PopUpAlertModal isOpen={false} onClose={() => {}} text="곧 오픈 예정입니다!" />
    </>
  )
}
