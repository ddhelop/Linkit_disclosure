'use client'

import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

interface ActivityItem {
  profileActivityId: number
  activityName: string
  activityRole: string
  activityStartDate: string
  activityEndDate: string | null
}

export default function ProfileEditCertifications() {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.87rem]">
      <Link href={'/profile/edit/certifications/new'} className="w-full">
        <Button mode="main2" animationMode="main" className="w-full">
          자격증 추가하기
        </Button>
      </Link>
    </div>
  )
}
