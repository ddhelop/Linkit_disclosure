import { useProfileView } from '@/entities/profile/model/ProfileViewContext'
import { stripHtmlAndImages } from '@/shared/hooks/useHtmlToString'
import Image from 'next/image'
import Link from 'next/link'
import { EditableContainer } from './common/EditableContainer'

export default function ProfileViewLog() {
  const { profileData } = useProfileView()
  const logItem = profileData?.profileLogItem
  const isMyProfile = profileData?.isMyProfile

  // 로그가 없으면 렌더링 하지 않음
  if (!logItem?.profileLogId) return null

  return (
    <EditableContainer
      editPath={`/profile/edit/log`}
      isEditable={isMyProfile}
      className="flex w-full flex-col gap-4 rounded-xl bg-white p-5 md:px-[2.75rem] md:py-[1.88rem]"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-grey80">{logItem?.logTitle}</span>
        <span className="text-xs text-grey50">|</span>
        <span className="text-xs font-normal text-grey60">{new Date(logItem?.modifiedAt).toLocaleDateString()}</span>
      </div>

      {/* 내용 */}
      <div
        className="text-sm leading-7 text-grey60 [&>h1]:text-2xl [&>h1]:font-semibold [&>h2]:text-xl [&>h2]:font-semibold"
        dangerouslySetInnerHTML={{ __html: logItem?.logContent }}
      />

      {/* 더보기 */}
      <div className="flex justify-end ">
        <Link
          href={`/${profileData?.profileInformMenu.emailId}/logs`}
          className="flex cursor-pointer items-center rounded-xl bg-grey10 py-2 pl-4 pr-2 text-sm text-grey60"
        >
          로그 더보기
          <Image src="/common/icons/right_arrow.svg" width={20} height={20} alt="arrow" />
        </Link>
      </div>
    </EditableContainer>
  )
}
