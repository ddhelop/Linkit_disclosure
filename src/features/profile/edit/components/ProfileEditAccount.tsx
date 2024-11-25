'use client'

import { usePhoneNumberFormatter } from '@/shared/hooks/usePhoneNumberFormatter'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getMemberBasicInform } from '../api/memberApi'

export default function ProfileEditAccount() {
  const { phoneNumber, setPhoneNumber } = usePhoneNumberFormatter()
  const [memberData, setMemberData] = useState({
    name: '',
    email: '',
    contact: '',
    platform: '',
    isMarketingAgree: false,
  })

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const data = await getMemberBasicInform()
        setMemberData({
          name: data.memberName,
          email: data.email,
          contact: data.contact,
          platform: data.platform,
          isMarketingAgree: data.isMarketingAgree,
        })
        const fakeEvent = { target: { value: data.contact } } as React.ChangeEvent<HTMLInputElement>
        setPhoneNumber(fakeEvent)
      } catch (error) {
        console.error('Failed to fetch member data:', error)
      }
    }

    fetchMemberData()
  }, [setPhoneNumber])

  const getPlatformText = (platform: string) => {
    if (!platform) return '소셜 로그인'

    switch (platform.toLowerCase()) {
      case 'google':
        return '구글 로그인'
      case 'naver':
        return '네이버 로그인'
      case 'kakao':
        return '카카오 로그인'
      default:
        return '소셜 로그인'
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[1.62rem] py-[1.88rem]">
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10">
            <div className="flex items-center gap-3">
              <Image src="/common/icons/google_email.svg" alt="edit" width={48} height={48} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">{getPlatformText(memberData.platform)}</p>
                <span className="font-semibold">{memberData.email}</span>
              </div>
            </div>
            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          <div className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10">
            <div className="flex items-center gap-3">
              <Image src="/common/icons/user_profile_light.svg" alt="edit" width={48} height={48} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">이름</p>
                <span className="font-semibold">{memberData.name}</span>
              </div>
            </div>
            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          <div className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10">
            <div className="flex items-center gap-3">
              <Image src="/common/icons/call_circle.svg" alt="edit" width={48} height={48} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">전화번호</p>
                <span className="font-semibold">{phoneNumber}</span>
              </div>
            </div>
            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          <div className="my-[1.88rem] h-[1px] w-[96%] bg-grey30" />

          <div className="flex w-full cursor-pointer items-center gap-2 pl-4">
            <Image
              src={memberData.isMarketingAgree ? '/common/icons/check_icon.svg' : '/common/icons/btn_not_check.svg'}
              alt="edit"
              width={24}
              height={24}
            />
            <p className="text-sm font-normal text-grey70">광고성 정보 수신 동의</p>
          </div>

          <div className="mt-[1.94rem] flex w-full cursor-pointer pl-4 text-sm font-normal text-grey60 underline">
            회원탈퇴
          </div>
        </div>
      </div>
    </>
  )
}
