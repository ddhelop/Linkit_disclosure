import TeamSelect from '@/features/team/TeamSelect'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamSelectPage() {
  return (
    <div className={`flex  flex-col items-center pb-10`}>
      <div className="flex w-[90%] flex-col pt-[5rem] lg:w-[55%]">
        <h1 className="text-2xl font-bold">나의 팀</h1>
        <p className="pt-2 text-sm font-normal text-grey60">나의 팀을 생성하고 관리해 보세요</p>

        {/*  */}
        <TeamSelect />

        {/* 팀 생성하기 버튼 */}
        <Link href={'/team/new'} className="mt-9 flex w-full justify-center">
          <button className="flex items-center gap-2 rounded-full bg-grey20 px-6 py-3 text-sm text-grey70 hover:ring-2 hover:ring-grey30">
            <Image src="/common/icons/plus_black.svg" alt="plus" width={16} height={16} />팀 생성하기
          </button>
        </Link>
      </div>
    </div>
  )
}
