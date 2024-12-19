// LeftMenu.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import TeamEditProfileCard from './TeamEditProfileCard'

const menuItems: { label: string; path: string; subPaths?: string[] }[] = [
  { label: '팀 로그', path: '/team/123/edit/log' },
  { label: '기본 정보', path: '/team/123/edit/basic' },
  { label: '모집 공고', path: '/team/123/edit/recruit' },
  {
    label: '팀 구성원',
    path: '/team/123/edit/members',
  },
  {
    label: '프로덕트',
    path: '/team/123/edit/products',
  },
  { label: '연혁', path: '/team/123/edit/history' },
]

const TeamEditLeftMenu = () => {
  const router = useRouter()
  const pathname = usePathname()

  const currentSection = pathname.split('/').pop()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="mt-6 w-[17.5rem]">
      <div className="flex w-full flex-col rounded-xl bg-[#FCFCFD]">
        <TeamEditProfileCard />
        <ul className="mt-8 flex w-full flex-col items-end gap-4">
          {menuItems.map((item, index) => {
            const isSelected = item.path.includes(currentSection ?? '')
            return (
              <li
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`relative flex w-full cursor-pointer items-center justify-between rounded-lg py-2 pl-6 
                  ${isSelected ? 'bg-grey20 font-semibold text-grey90' : 'hover:bg-grey20'}`}
              >
                <span className={`text-sm ${isSelected ? 'text-grey90' : 'text-grey80'}`}>{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TeamEditLeftMenu
