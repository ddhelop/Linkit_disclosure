import { useProfileView } from '@/entities/profile/model/ProfileViewContext'
import { stripHtmlAndImages } from '@/shared/hooks/useHtmlToString'
import Image from 'next/image'

export default function ProfileViewLog() {
  const { profileData } = useProfileView()
  const logItem = profileData?.profileLogItem
  const isMyProfile = profileData?.isMyProfile
  console.log(logItem)

  // 로그가 없으면 렌더링 하지 않음
  if (!logItem?.profileLogId) return null

  return (
    <div className="flex w-[95%] flex-col gap-4 rounded-xl bg-white px-[2.75rem] py-[1.88rem]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-grey80">{logItem?.logTitle}</span>
        <span className="text-xs text-grey50">|</span>
        <span className="text-xs font-normal text-grey60">{new Date(logItem?.modifiedAt).toLocaleDateString()}</span>
      </div>

      {/* 내용 */}
      <div className="text-sm text-grey60">{stripHtmlAndImages(logItem?.logContent)}</div>

      {/* 더보기 */}
      <div className="flex justify-end ">
        <div className="flex cursor-pointer items-center rounded-xl bg-grey10 py-2 pl-4 pr-2 text-sm text-grey60">
          로그 더보기
          <Image src="/common/icons/right_arrow.svg" width={20} height={20} alt="arrow" />
        </div>
      </div>
    </div>
  )
}
