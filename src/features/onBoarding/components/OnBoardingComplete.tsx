import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function OnBoardingComplete() {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div className="mt-[5.31rem] flex w-[90%] flex-col items-center lg:w-[35%]">
          <Image src="/features/auth/sign_up_complete.svg" width={320} height={200} alt="complete" />

          <div className="mt-[1.75rem] flex flex-col items-center gap-3">
            <p className="text-xl font-semibold text-grey90">회원가입 완료!</p>
            <p className="text-sm text-grey50">나머지 정보를 입력해 프로필을 완성해 보세요</p>
          </div>

          <Link href={'/profile/edit/basic'} className="flex w-full justify-center">
            <Button
              animationMode="main"
              className="mt-[5.13rem] w-[90%] rounded-lg bg-main py-3 text-lg font-semibold text-white lg:w-[62%]"
            >
              프로필 작성하기
            </Button>
          </Link>
          <Link href={'/'} className="mt-8 cursor-pointer text-sm font-normal text-grey60 underline">
            나중에 입력하기
          </Link>
        </div>
      </div>
    </>
  )
}
