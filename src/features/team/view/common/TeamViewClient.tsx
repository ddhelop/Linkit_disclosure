import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function TeamViewClient() {
  return (
    <div className="flex flex-col">
      {/* 그라데이션 영역 */}
      <div
        className="flex h-[18.4rem] px-[7.12rem] py-8"
        style={{ background: 'linear-gradient(180deg, #D3E1FE -16.67%, #FCFCFD 100%)' }}
      >
        <div
          className="flex h-full w-full flex-col items-center justify-center rounded-[1.875rem] bg-white bg-opacity-50"
          style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
        >
          <span className="font-semibold text-grey90">앗! 아직 팀프로필이 없어요</span>
          <span className="pt-[0.16rem] text-xs font-normal text-grey60">정보를 입력하고 팀을 생성해 보세요</span>

          <Link href="/team/create" className="mt-6">
            <Button className="rounded-[5rem] px-[5rem] py-2" animationMode="main">
              팀 생성하러 가기
            </Button>
          </Link>
        </div>
      </div>

      {/* 팀 정보 영역 */}
    </div>
  )
}
