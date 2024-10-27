// src/widgets/Header/components/MobileMenu.tsx
import Link from 'next/link'

interface MobileMenuProps {
  isAuth: boolean
  handleLogout: () => void
  isOpen: boolean
  closeMenu: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuth, handleLogout, isOpen, closeMenu }) => (
  <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
    {isAuth ? (
      <>
        <Link href="/myResume" onClick={closeMenu} className="p-4 text-sm leading-6">
          마이페이지
        </Link>
        <Link href="/findMember" onClick={closeMenu} className="p-4 text-sm leading-6">
          팀원 찾기
        </Link>
        <div
          onClick={() => {
            handleLogout()
            closeMenu()
          }}
          className="p-4 text-sm leading-6"
        >
          로그아웃
        </div>
      </>
    ) : (
      <>
        <button onClick={closeMenu} className="p-4 text-sm leading-6">
          로그인
        </button>
        <Link href="/findTeam" onClick={closeMenu} className="p-4 text-sm leading-6">
          팀 찾기
        </Link>
      </>
    )}
  </div>
)

export default MobileMenu
