import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamSelect() {
  return (
    <div
      className="mt-8 flex w-full flex-col items-center justify-center gap-8 rounded-[1.88rem] bg-white p-[6.2rem]"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10);' }}
    >
      <Image src={'/common/icons/log-out.svg'} alt="team-select" width={20} height={20} />
      <div className="flex w-full flex-col items-center">
        <span className="font-semibold text-grey90">앗! 아직 팀프로필이 없어요</span>
        <span className="text-xs font-normal text-grey60">정보를 입력하고 팀을 생성해 보세요</span>
      </div>
      <Link href={'/team/new'}>
        <Button animationMode="main" mode="main" className="rounded-[5rem] px-[5rem] py-1 text-sm">
          팀 생성하러 가기
        </Button>
      </Link>
    </div>
  )
}
