'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getActivities } from '../../api/profileActivityApi'

interface ActivityItem {
  profileActivityId: number
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string
}

export default function ElementComponent() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities()
        setActivities(data)
      } catch (error) {
        console.error('Failed to fetch activities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (activities.length === 0) {
    return <div>활동 내역이 없습니다.</div>
  }

  return (
    <div>
      {activities.map((activity) => (
        <ActivityRow key={activity.profileActivityId} activity={activity} />
      ))}
    </div>
  )
}

function ActivityRow({ activity }: { activity: ActivityItem }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <div className="relative flex items-center justify-between gap-1 rounded-lg px-6 py-5 hover:bg-grey10">
      <div className="gap-2">
        <span className="cursor-pointer font-semibold text-grey80">{activity.activityName}</span>
        <div className="flex gap-4 text-xs">
          <span className="text-grey80">{activity.activityRole}</span>
          <span className="text-grey60">
            {activity.activityStartDate} ~ {activity.activityEndDate}
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
              <li
                className="cursor-pointer px-4 py-1 text-grey70 hover:bg-grey10"
                onClick={() => alert(`${activity.activityName} 수정하기 클릭됨`)}
              >
                수정하기
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
