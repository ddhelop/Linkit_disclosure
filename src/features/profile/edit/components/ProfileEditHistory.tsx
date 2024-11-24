'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { getActivities } from '../api/profileActivityApi'
import ElementComponent from './common/ElementComponent'

interface ActivityItem {
  profileActivityId: number
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string | null
}

export default function ProfileEditHistory() {
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
    return (
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
        <Link href={'/profile/edit/history/new'} className="w-full">
          <Button mode="main2" animationMode="main" className="w-full">
            활동 추가하기
          </Button>
        </Link>
        <div className="mt-4 text-grey60">활동 내역이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
      <Link href={'/profile/edit/history/new'} className="w-full">
        <Button mode="main2" animationMode="main" className="w-full">
          활동 추가하기
        </Button>
      </Link>

      {/* 활동 목록 렌더링 */}
      <div className="mt-4">
        {activities.map((activity) => (
          <ElementComponent key={activity.profileActivityId} activity={activity} />
        ))}
      </div>
    </div>
  )
}
