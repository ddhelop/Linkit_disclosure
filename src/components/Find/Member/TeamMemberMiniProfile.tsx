'use client'
import { useRecoilValue } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { PostSaveMember, DeleteSaveMember } from '@/lib/action'
import { PrivateProfile } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { pushNotification } from '@/components/common/component/ToastPopUp/ToastPopup'

interface TeamMemberMiniProfileProps {
  profile: PrivateProfile
}

export default function TeamMemberMiniProfile({ profile }: TeamMemberMiniProfileProps) {
  const accessToken = useRecoilValue(accessTokenState) || ''
  const [isSaved, setIsSaved] = useState<boolean>(profile.isPrivateSaved)
  const isAuth = useRecoilValue(authState)

  const onClickSave = async () => {
    if (isAuth) {
      try {
        if (isSaved) {
          const response = await DeleteSaveMember(accessToken, profile.id)
          if (response.ok) {
            setIsSaved(false)
            pushNotification('찜하기가 취소되었습니다.', 'success')
          } else {
            pushNotification('찜하기 취소에 실패했습니다.', 'error')
          }
        } else {
          const response = await PostSaveMember(accessToken, profile.id)
          if (response.ok) {
            setIsSaved(true)
            pushNotification('저장되었습니다.', 'success')
          } else {
            const responseData = await response.json()
            pushNotification(responseData.message, 'error')
          }
        }
      } catch {
        pushNotification('요청에 실패했습니다.', 'error')
      }
    } else {
      pushNotification('로그인이 필요합니다.', 'error')
    }
  }

  return (
    <div className="flex w-[23rem] flex-col justify-between gap-[2rem] rounded-[0.63rem] bg-[#fff] p-5 shadow-sm">
      <div className="flex w-full items-start justify-between">
        <div className="w-[80%] text-lg font-semibold leading-[1.375rem] opacity-80">{profile.profileTitle}</div>
        <Image
          src={isSaved ? '/assets/icons/filledSaveIcon.svg' : '/assets/icons/saveIcon.svg'}
          width={17}
          height={20}
          alt="save"
          className="cursor-pointer"
          onClick={onClickSave}
        />
      </div>

      <div className="flex flex-col ">
        <div className="flex flex-wrap gap-2">
          {profile.myKeywordNames.map((keyword, index) => (
            <div
              key={index}
              className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] py-1 text-sm text-grey60 "
            >
              {keyword}
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-[0.94rem]">
          <div className="flex gap-4">
            <div className="relative h-[41px] w-[41px] overflow-hidden rounded-full">
              <Image
                src={profile.miniProfileImg || '/assets/icons/mini_user_icon.svg'}
                layout="fill"
                objectFit="cover"
                alt="Profile Image"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-xs font-semibold text-grey70">{profile.memberName}</p>
              <p className="text-xs text-grey60">{profile.jobRoleNames.join(', ')}</p>
            </div>
          </div>
          <div className="flex items-end">
            <Link href={`/private/${profile.id}`}>
              <button className="rounded-[0.29rem] bg-grey100 px-4 py-[0.57rem] text-xs text-[#fff] sm:px-7 sm:text-base">
                보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
