'use client'
import Input from '@/shared/ui/Input/Input'

import { usePhoneNumberFormatter } from '@/shared/hooks/usePhoneNumberFormatter'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'

export default function ProfileEditAccount() {
  const { phoneNumber, setPhoneNumber } = usePhoneNumberFormatter()

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[1.62rem] py-[1.88rem]">
        <div className="flex flex-col items-center gap-2">
          {/* 단일 항목 - 이메일 */}
          <div className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10">
            <div className="flex items-center gap-3">
              <Image src="/common/icons/google_email.svg" alt="edit" width={48} height={48} />

              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">구글 로그인</p>
                <span className="font-semibold">linkit@gmail.com</span>
              </div>
            </div>

            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          {/* 단일 항목 - 이름 */}
          <div className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10">
            <div className="flex items-center gap-3">
              <Image src="/common/icons/user_profile_light.svg" alt="edit" width={48} height={48} />

              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">이름</p>
                <span className="font-semibold">김링킷</span>
              </div>
            </div>

            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          {/* 단일 항목 - 전화번호 */}
          <div className="flex w-full items-center justify-between rounded-xl px-3 py-[1.06rem] hover:cursor-pointer hover:bg-grey10">
            <div className="flex items-center gap-3">
              <Image src="/common/icons/call_circle.svg" alt="edit" width={48} height={48} />

              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-normal text-grey60">전화번호</p>
                <span className="font-semibold">010-1234-5678</span>
              </div>
            </div>

            <Image src="/common/icons/arrow-right(greyblack).svg" alt="edit" width={32} height={32} />
          </div>

          {/* 구분선 */}
          <div className="my-[1.88rem] h-[1px] w-[96%] bg-grey30" />

          {/* 체크 */}
          <div className="flex w-full cursor-pointer items-center gap-2 pl-4">
            <Image src="/common/icons/not_check.svg" alt="edit" width={24} height={24} />
            <p className="text-sm font-normal text-grey70">광고성 정보 수신 동의</p>
          </div>

          {/* 회원탈퇴 */}
          <div className="mt-[1.94rem] flex w-full cursor-pointer pl-4 text-sm font-normal text-grey60 underline">
            회원탈퇴
          </div>
        </div>
      </div>
    </>
  )
}
