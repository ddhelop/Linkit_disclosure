'use client'
import { useRecoilValue } from 'recoil'
import { accessTokenState, authState } from '@/context/recoil-context'
import { PostSaveMember, DeleteSaveMember } from '@/lib/action'
import { PrivateProfile } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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
            alert('찜하기가 취소되었습니다.')
          } else {
            alert('찜하기 취소에 실패했습니다.')
          }
        } else {
          const response = await PostSaveMember(accessToken, profile.id)
          if (response.ok) {
            setIsSaved(true)
            alert('저장되었습니다.')
          } else {
            alert('저장에 실패했습니다.')
          }
        }
      } catch {
        alert('요청에 실패했습니다.')
      }
    } else {
      alert('로그인 후 이용해주세요.')
    }
  }

  return (
    <div className="flex flex-col justify-between gap-[2rem] rounded-[0.63rem] bg-[#fff] p-5 shadow-sm">
      <div className="flex w-full justify-between">
        <div className="w-[80%] text-xl font-semibold leading-8 opacity-80">{profile.profileTitle}</div>
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
            <div key={index} className="rounded-[0.45rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.57rem] py-1 text-grey60 ">
              {keyword}
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-[0.94rem]">
          <div className="flex gap-4">
            <Image
              src={profile.miniProfileImg || '/assets/images/DefaultProfile.png'}
              width={55}
              height={55}
              alt="Profile Image"
              className="rounded-full"
            />
            <div className="flex flex-col justify-center gap-1">
              <p className="font-semibold text-grey70">{profile.memberName}</p>
              <p className="text-grey70">{profile.jobRoleNames.join(', ')}</p>
            </div>
          </div>
          <Link href={`/private/${profile.id}`}>
            <button className="rounded-[0.29rem] bg-grey100 px-7 py-[0.57rem] text-[#fff]">보기</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
