// src/widgets/Header/components/NavigationLinks.tsx
import Image from 'next/image'
import Link from 'next/link'

interface NavigationLinksProps {
  isAuth: boolean
  openLoginModal: () => void
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ isAuth, openLoginModal }) => (
  <div className="flex gap-[2.19rem]">
    <Link href="/" className="-m-1.5 p-1.5">
      <Image src="/assets/colorLogo.svg" alt="Logo" width={100} height={100} />
    </Link>
    <div className="hidden gap-[1.88rem] md:flex">
      <Link href="#" onClick={openLoginModal} className="font-medium text-grey90 hover:text-main">
        창업/공모전 정보
      </Link>
      {isAuth ? (
        <>
          <Link href="/findMember" className="font-medium text-grey90 hover:text-main">
            팀원 찾기
          </Link>
          <Link href="/findTeam" className="font-medium text-grey90 hover:text-main">
            팀 찾기
          </Link>
        </>
      ) : (
        <>
          <button onClick={openLoginModal} className="font-medium text-grey90 hover:text-main">
            로그인
          </button>
          <Link href="#FAQ" className="font-medium text-grey90 hover:text-main">
            FAQ
          </Link>
        </>
      )}
    </div>
  </div>
)

export default NavigationLinks
