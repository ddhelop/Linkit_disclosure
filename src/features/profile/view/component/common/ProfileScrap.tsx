import { useProfile } from '@/features/profile/edit/context/ProfileContext'
import Image from 'next/image'

export default function ProfileScrap() {
  const { profileData } = useProfile()

  return (
    <div className="mt-7 flex w-full items-center justify-between rounded-full bg-grey20 py-[0.38rem] pl-4 pr-[0.39rem] text-sm text-grey70">
      <div className="flex gap-5">
        <span className="">스크랩 수</span>
        <span className="">{profileData?.profileScrapCount}</span>
      </div>
      <button className="flex items-center gap-2 rounded-full bg-[#D3E1FE] px-[1.38rem] py-[0.56rem] text-[#4D82F3]">
        <Image src="/common/icons/not_save.svg" alt="scrap" width={20} height={20} />
        <span>스크랩하기</span>
      </button>
    </div>
  )
}
