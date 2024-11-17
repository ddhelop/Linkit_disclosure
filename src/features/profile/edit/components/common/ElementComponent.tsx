'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ActivityItem {
  profileActivityId: number
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string | null
}

export default function ElementComponent({ activity }: { activity: ActivityItem }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="relative flex items-center justify-between gap-1 rounded-lg px-6 py-5 hover:bg-grey10">
      <div className="gap-2">
        <Link
          href={{
            pathname: '/profile/edit/history/new',
            query: { id: activity.profileActivityId },
          }}
        >
          <span className="cursor-pointer font-semibold text-grey80">{activity.activityName}</span>
        </Link>
        <div className="flex gap-4 text-xs">
          <span className="text-grey80">{activity.activityRole}</span>
          <span className="text-grey60">
            {activity.activityStartDate} ~ {activity.activityEndDate || '진행 중'}
          </span>
        </div>
      </div>

      <div className="relative">
        <Image
          src="/common/icons/more_row.svg"
          width={22}
          height={22}
          alt="more options"
          className="cursor-pointer"
          onClick={handleToggleMenu}
        />

        {isMenuOpen && (
          <div className="absolute left-0 mt-2 w-[6rem] rounded-lg border border-grey30 bg-white shadow-lg">
            <ul className="py-2 text-xs">
              <li className="cursor-pointer px-4 py-1 text-grey70 hover:bg-grey10">
                <Link
                  href={{
                    pathname: '/profile/edit/history/new',
                    query: { id: activity.profileActivityId },
                  }}
                >
                  수정하기
                </Link>
              </li>
              <li
                className="cursor-pointer px-4 py-1 text-red-500 hover:bg-grey10"
                onClick={() => alert(`${activity.activityName} 삭제하기 클릭됨`)}
              >
                삭제하기
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
