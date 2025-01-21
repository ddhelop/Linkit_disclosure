'use client'

import AnnouncementCard from '@/shared/components/AnnouncementCard'
import { useEffect, useState } from 'react'
import { getAnnouncement } from './api/HomeApi'
import { Announcement } from '@/features/find/types/FindTypes'

export default function HomeAnnouncementSection() {
  const [announcement, setAnnouncement] = useState<Announcement[]>([])

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await getAnnouncement()
      setAnnouncement(response.result.announcementInformMenus)
    }
    fetchAnnouncement()
  }, [])

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold">뫄뫄님을 찾고 있어요!</h1>

      <div className="grid grid-cols-3 gap-6">
        {announcement.map((announcement) => (
          <AnnouncementCard key={announcement.teamMemberAnnouncementId} announcement={announcement} />
        ))}
      </div>
    </div>
  )
}
