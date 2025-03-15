'use client'
import AnnouncementCard from '@/shared/components/AnnouncementCard'

import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getAnnouncements } from '../api/homeApi'

export default function HomeAnnouncementSection() {
  const { data } = useQuery({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
  })

  return (
    <section className="flex w-full flex-col gap-6" aria-labelledby="announcement-heading">
      <div className="flex w-full justify-between">
        <h2 id="announcement-heading" className="text-xl font-semibold">
          팀원을 찾고 있어요
        </h2>
        <Link
          href="/find/announcement"
          className="flex cursor-pointer items-center gap-1"
          aria-label="모집 공고 전체보기"
        >
          <span className="text-sm text-grey60">전체보기</span>
          <Image src="/common/icons/arrow-right(greyblack).svg" alt="" width={16} height={16} aria-hidden="true" />
        </Link>
      </div>

      <div
        className="scrollbar-hidden flex gap-6 overflow-x-auto md:grid md:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {data?.result?.announcementInformMenus?.map((announcement: any) => (
          <AnnouncementCard key={announcement.teamMemberAnnouncementId} announcement={announcement} />
        )) || <p>모집 공고가 없습니다.</p>}
      </div>
    </section>
  )
}
