// LeftMenu.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ProfileBooleanMenuType } from '../../types/ProfileLayoutType'
import { useProfileEdit } from '../../context/ProfileEditContext'

const menuItems: { label: string; path: string; key: keyof ProfileBooleanMenuType; subPaths?: string[] }[] = [
  { label: '미니 프로필', path: '/profile/edit/basic', key: 'isMiniProfile' },
  { label: '보유 스킬', path: '/profile/edit/skills', key: 'isProfileSkill' },
  { label: '이력', path: '/profile/edit/history', key: 'isProfileActivity', subPaths: ['/profile/edit/history/new'] },
  {
    label: '포트폴리오',
    path: '/profile/edit/portfolio',
    subPaths: ['/profile/edit/portfolio/new'],
    key: 'isProfilePortfolio',
  },
  {
    label: '학력',
    path: '/profile/edit/education',
    subPaths: ['/profile/edit/education/new'],
    key: 'isProfileEducation',
  },
  { label: '수상', path: '/profile/edit/awards', subPaths: ['/profile/edit/awards/new'], key: 'isProfileAwards' },
  {
    label: '자격증',
    path: '/profile/edit/certifications',
    subPaths: ['/profile/edit/certifications/new'],
    key: 'isProfileLicense',
  },
  { label: '링크', path: '/profile/edit/links', key: 'isProfileLink' },
]

const LeftMenu = () => {
  const router = useRouter()
  const pathname = usePathname() // 현재 경로를 가져옵니다.
  const { profileData } = useProfileEdit() // ProfileProvider에서 제공하는 profileData를 가져옵니다.
  const profileBooleanMenu = profileData.profileBooleanMenu

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="mt-6 w-[17.5rem]">
      {/* 나의 로그 */}
      <Link
        href={'/profile/edit/log'}
        className="flex cursor-pointer flex-col rounded-xl border border-[#7EA5F8] bg-grey20 py-3 pl-6 pr-3 hover:ring-4 hover:ring-grey40 hover:brightness-95"
      >
        <div className="flex justify-between">
          <h2 className="text-main">나의 로그</h2>
          <Image src="/common/icons/right_arrow_grey60.svg" width={24} height={24} alt="arrow-right" />
        </div>
      </Link>

      {/* 왼쪽 메뉴바 - 프로필 관리 */}
      <div className="mt-5 flex w-full flex-col">
        <label className="rounded-xl bg-grey20 px-6 py-3">프로필 관리</label>
        <ul className="flex w-full flex-col items-end bg-[#FCFCFD] pl-3 pr-6 pt-3">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path || item.subPaths?.includes(pathname)
            const isChecked = profileBooleanMenu?.[item.key] || false

            return (
              <li
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`relative mt-2 flex w-[90%] cursor-pointer items-center justify-between rounded-lg py-[0.31rem] pl-4 pr-2 hover:bg-grey20 ${
                  isActive ? 'font-semibold text-main' : 'text-grey80'
                }`}
              >
                {isActive && <span className="absolute left-0 h-[70%] w-[3px] bg-main"></span>}
                <span>{item.label}</span>
                <div className="ml-2 flex h-[1.25rem] w-[1.25rem] items-center justify-center">
                  {isChecked ? (
                    <Image src="/common/icons/check_icon.svg" width={20} height={20} alt="check" />
                  ) : (
                    <div className="h-[1.25rem] w-[1.25rem] rounded-full border border-grey40"></div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default LeftMenu
