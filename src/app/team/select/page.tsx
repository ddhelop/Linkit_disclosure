import TeamSelect from '@/features/team/TeamSelect'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamSelectPage() {
  return (
    <div className={`flex  h-[calc(100vh-4rem)] flex-col items-center`}>
      <div className="flex w-[55%] flex-col pt-[5rem]">
        <h1 className="text-2xl font-bold">나의 팀</h1>
        <p className="pt-2 text-sm font-normal text-grey60">생성되어 있는 나의 팀을 선택해 팀 프로필을 관리해 보세요</p>
        <TeamSelect />

        <Link href={'/team/new'} className="mt-9 flex w-full justify-center">
          <button className="flex items-center gap-2 rounded-full bg-grey20 px-6 py-3 text-sm text-grey70 hover:ring-2 hover:ring-grey30">
            <Image src="/common/icons/plus_black.svg" alt="plus" width={16} height={16} />새 팀 만들기
          </button>
        </Link>
      </div>
    </div>
  )
}
