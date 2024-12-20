// LeftMenu.tsx
'use client'

import { useRouter, usePathname, useParams } from 'next/navigation'
import TeamEditProfileCard from './TeamEditProfileCard'

const TeamEditLeftMenu = ({ params }: { params: { teamName: string } }) => {
  const router = useRouter()
  const pathname = usePathname()

  const teamName = params.teamName
  const currentSection = pathname.split('/').pop()

  const menuItems = [
    { label: '팀 로그', path: `/team/${teamName}/edit/log` },
    { label: '기본 정보', path: `/team/${teamName}/edit/basic` },
    { label: '모집 공고', path: `/team/${teamName}/edit/recruit` },
    { label: '팀 구성원', path: `/team/${teamName}/edit/members` },
    { label: '프로덕트', path: `/team/${teamName}/edit/products` },
    { label: '연혁', path: `/team/${teamName}/edit/history` },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="mt-6 w-[17.5rem]">
      <div className="flex w-full flex-col rounded-xl bg-[#FCFCFD]">
        <TeamEditProfileCard params={params} />
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
