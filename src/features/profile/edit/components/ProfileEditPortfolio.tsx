import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import ProjectComponent from './common/ProjectComponent'
import Link from 'next/link'

export default function ProfileEditPortfolio() {
  return (
    <>
      <div className="flex flex-col rounded-xl bg-white px-[1.62rem] pb-7 pt-[1.88rem]">
        <Link href="/profile/edit/portfolio/new" className="flex w-full">
          <Button
            animationMode="main"
            mode="main2"
            className=" flex w-full items-center justify-center gap-2 py-[0.38rem] text-sm"
          >
            <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />새 프로젝트
          </Button>
        </Link>

        {/* 프로젝트 */}
        <div className="flex flex-col pt-6">
          <ProjectComponent />
        </div>
      </div>
    </>
  )
}
