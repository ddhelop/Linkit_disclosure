import { Announcement } from '@/features/find/types/FindTypes'
import Image from 'next/image'

export default function AnnouncementCard() {
  return (
    <div
      className="flex cursor-pointer flex-col gap-3 rounded-lg border bg-grey10 px-[1.62rem] py-[1.38rem] hover:border-[#7EA5F8]"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <div className="flex justify-between">
        <span className="rounded-full bg-[#FFECF0] px-3 py-1 text-xs text-[#FF345F]">D-19</span>
        <Image src="/common/icons/save.svg" alt="announcement-icon" width={20} height={20} />
      </div>

      <div className="flex items-center gap-2">
        <Image src="/common/default_profile.svg" alt="announcement-icon" width={22} height={22} />
        <span className="text-sm text-grey90">팀이름</span>
      </div>
      <div className="flex w-[90%] flex-col gap-1 ">
        <span className="text-lg font-semibold text-grey90">뫄뫄 프로젝트를 위해 개발자를 찾고 있습니다</span>
        <span className="text-xs text-grey70">스크랩수 50</span>
      </div>

      <div className="flex gap-2">
        <div className="rounded-[0.38rem] bg-[#D3E1FE] px-3 py-1 text-sm text-main">포지션 대분류</div>
        <div className="rounded-[0.38rem] bg-[#EDF3FF] px-3 py-1 text-sm text-main">요구 스킬</div>
        <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-sm text-main">+2</div>
      </div>
    </div>
  )
}
