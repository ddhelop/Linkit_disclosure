'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { deleteActivity, getActivities } from '../api/profileActivityApi'
import ElementComponent from './common/ElementComponent'
import Image from 'next/image'
import { HistoryListSkeleton } from './skeletons/ListSkeletons'

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

  const handleDelete = async (id: number) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?')
    if (!isConfirmed) return

    try {
      await deleteActivity(id)
      setActivities((prev) => prev.filter((activity) => activity.profileActivityId !== id))
    } catch (error) {
      console.error('Failed to delete activity:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col">
        <Link href={'/profile/edit/history/new'} className="w-full">
          <Button mode="main2" animationMode="main" size="custom" className="w-full rounded-[0.6rem] py-2 text-sm">
            + 추가하기
          </Button>
        </Link>
        <HistoryListSkeleton />
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="flex flex-col">
        <Link href={'/profile/edit/history/new'} className="w-full">
          <Button mode="main2" animationMode="main" size="custom" className="w-full rounded-[0.63rem] py-2 text-sm">
            + 추가하기
          </Button>
        </Link>
        <div className="mt-5 flex w-full justify-center">
          <Image
            src={'/common/images/not-contents-ui.png'}
            alt="empty"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col">
      <Link href={'/profile/edit/history/new'} className="w-full">
        <Button mode="main2" animationMode="main" size="custom" className="w-full rounded-[0.6rem] py-2 text-sm">
          + 추가하기
        </Button>
      </Link>

      <div className="mt-4">
        {activities.map((activity) => (
          <ElementComponent
            key={activity.profileActivityId}
            id={activity.profileActivityId}
            title={activity.activityName}
            subtitle={activity.activityRole}
            date={activity.activityStartDate}
            endDate={activity.activityEndDate}
            editPath="/profile/edit/history/new"
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
