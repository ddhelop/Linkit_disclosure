'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ProfilePortfolioItem } from '@/entities/profile/model/types'
import { getProfilePortfolioList } from '@/entities/profile/api/profileApi'
import ProjectComponent from '@/features/profile/edit/components/common/ProjectComponent'

export default function PortfolioPage({ params }: { params: { emailId: string } }) {
  const [profileData, setProfileData] = useState<ProfilePortfolioItem[] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const emailId = params.emailId as string
      const data = await getProfilePortfolioList(emailId)
      setProfileData(data.result.profilePortfolioItems)
    }
    getData()
  }, [params.emailId])

  return (
    <div className="flex flex-col p-4 lg:px-[4.25rem] lg:py-[3.75rem]">
      <Link href={`/${params.emailId}`} className="flex items-center gap-2 text-xl font-semibold">
        <Image src="/common/icons/arrow-left.svg" alt="arrow_left" width={24} height={24} />
        뒤로가기
      </Link>

      <div className="mt-6 flex flex-col gap-3 lg:gap-6">
        {profileData?.map((item) => <ProjectComponent key={item.profilePortfolioId} item={item} />)}
      </div>
    </div>
  )
}
