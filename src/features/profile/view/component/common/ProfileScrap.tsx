'use client'
import { useProfileView } from '@/entities/profile/model/ProfileViewContext'
import { handleScrap } from '@/features/profile/api/profileViewApi'
import Image from 'next/image'
import { useState } from 'react'

export default function ProfileScrap() {
  const { profileData } = useProfileView()
  const [scrapCount, setScrapCount] = useState(profileData?.profileScrapCount)
  const [isScrap, setIsScrap] = useState(profileData?.profileInformMenu.isProfileScrap)

  const onClickScrap = async () => {
    if (!profileData?.profileInformMenu.emailId || isScrap === undefined) return
    const response = await handleScrap(profileData.profileInformMenu.emailId, isScrap)

    if (response.isSuccess) {
      setIsScrap(!isScrap)
      setScrapCount((prev) => (prev ?? 0) + (isScrap ? -1 : 1))
    }
  }

  return (
    <div className="mt-7 flex w-full items-center justify-between rounded-full bg-grey20 py-[0.38rem] pl-4 pr-[0.39rem] text-sm text-grey70">
      <div className="flex gap-5">
        <span className="">스크랩 수</span>
        <span className="">{scrapCount}</span>
      </div>
      <button
        onClick={onClickScrap}
        className="flex items-center gap-2 rounded-full bg-[#D3E1FE] px-[1.38rem] py-[0.56rem] text-[#4D82F3] hover:brightness-95"
      >
        {isScrap ? (
          <Image src="/common/icons/save.svg" alt="scrap" width={20} height={20} />
        ) : (
          <Image src="/common/icons/not_save.svg" alt="scrap" width={20} height={20} />
        )}
      </button>
    </div>
  )
}
