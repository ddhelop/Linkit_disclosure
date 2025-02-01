'use client'

import AnnouncementCard from '@/shared/components/AnnouncementCard'
import { useEffect, useState } from 'react'
import { getAnnouncement } from './api/HomeApi'
import { Announcement } from '@/features/find/types/FindTypes'
import { IMyProfileBasicInform } from '@/shared/types/MyProfileBasicInformTypes'
import { getMyProfileBasicInform } from '@/shared/api/profile/fetchProfileInform'
import Image from 'next/image'
import Link from 'next/link'

export default function HomeAnnouncementSection() {
  const [announcement, setAnnouncement] = useState<Announcement[]>([])
  // const [profile, setProfile] = useState<IMyProfileBasicInform>()

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await getAnnouncement()
      // const profileResponse = await getMyProfileBasicInform()
      setAnnouncement(response.result.announcementInformMenus)
      // setProfile(profileResponse.result)
    }
    fetchAnnouncement()
  }, [])

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full justify-between">
        {/* {profile?.memberName ? (
          // <h1 className="text-xl font-semibold">{profile?.memberName}님을 찾고 있어요!</h1>
          <h1 className="text-xl font-semibold">팀원을 찾고 있어요</h1>
        ) : ( */}
        <h1 className="text-xl font-semibold">팀원을 찾고 있어요</h1>
        <Link href="/find/announcement" className="flex cursor-pointer items-center gap-1">
          <span className="text-sm text-grey60 ">전체보기</span>
          <Image src="/common/icons/arrow-right(greyblack).svg" alt="arrow_right" width={16} height={16} />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {announcement.map((announcement) => (
          <AnnouncementCard key={announcement.teamMemberAnnouncementId} announcement={announcement} />
        ))}
      </div>
    </div>
  )
}
