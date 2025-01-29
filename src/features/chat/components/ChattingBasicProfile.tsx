import Image from 'next/image'
import { ChatBasicProfileProps } from '../types/ChatTypes'

export default function ChattingBasicProfile({
  chatPartnerName,
  chatPartnerImageUrl,
  majorPosition,
  cityName,
  divisionName,
  chatPartnerOnline,
}: ChatBasicProfileProps) {
  return (
    <div className="flex w-full gap-4 rounded-xl bg-white px-[1.88rem] py-3">
      <div className="relative h-[70px] w-[80px] rounded-lg">
        <Image
          src={chatPartnerImageUrl || '/common/default_profile.svg'}
          alt="Profile"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <span className="text-lg font-semibold text-grey90">{chatPartnerName}</span>
            {chatPartnerOnline && (
              <span className="flex items-center gap-1">
                <Image src={'/common/icons/blue_circle.svg'} width={6} height={6} alt="circle" />
                <span className="text-xs text-[#4D82F3]">온라인</span>
              </span>
            )}
          </div>
          <div className="flex gap-2 text-xs text-grey60">
            <span className="text-grey50">포지션 |</span>
            <span className="text-grey70">{majorPosition}</span>
          </div>
          <div className="flex gap-2 text-xs text-grey60">
            <span className="text-grey50">지역 |</span>
            <span className="text-grey70">
              {cityName} {divisionName}
            </span>
          </div>
        </div>
        <Image src={'/common/icons/more_row.svg'} width={22} height={22} alt="more_row" className="cursor-pointer" />
      </div>
    </div>
  )
}
