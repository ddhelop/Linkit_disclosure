'use client'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { getProfileDetail } from '../api/ProfileViewApi'
import { useParams } from 'next/navigation'

export default function ProfileViewWideInfo() {
  const { emailId } = useParams()

  const { data } = useQuery({
    queryKey: ['profile', emailId],
    queryFn: () => getProfileDetail(emailId as string),
  })

  const profileInformMenu = data?.result.profileInformMenu

  return (
    <Link
      href={`/profile/${profileInformMenu?.emailId}/log`}
      className="flex w-full cursor-pointer justify-center bg-[#EDF3FF] px-6 py-8 hover:bg-grey10"
    >
      <div className="flex w-full flex-col gap-3 lg:w-[90%]">
        <div className="flex items-center gap-4">
          <div className="relative h-[46px] w-[46px] rounded-md">
            <Image
              src={profileInformMenu?.profileImagePath || '/common/default_profile.svg'}
              alt="profile logo"
              fill
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-sm font-semibold text-grey90">{profileInformMenu?.memberName}</h1>
            <div className="flex items-center gap-2 text-xs">
              <p className="text-grey70">{profileInformMenu?.majorPosition}</p>
              <p className="text-grey50">|</p>
              <p className="text-grey70">
                {profileInformMenu?.regionDetail.cityName} {profileInformMenu?.regionDetail.divisionName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
