import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import TeamEditRecruitList from '@/features/team/edit/recruitment/TeamEditRecruitList'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamEditRecruitPage({ params }: { params: { teamName: string } }) {
  const teamName = params.teamName

  return (
    <>
      <div className="flex flex-col pb-16">
        <h1 className="text-xl font-bold">모집 공고</h1>
        <p className="mb-5 pt-2 text-xs font-normal text-grey60"></p>

        {/* <TeamEditRecruitment /> */}
        <Link href={`/team/${params.teamName}/edit/recruit/new`}>
          <Button
            animationMode="main"
            mode="main2"
            size="custom"
            className="flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
          >
            <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
            추가하기
          </Button>
        </Link>
        <TeamEditRecruitList params={params} />
      </div>
      <ProfileEditBottomNav prevPath={`/team/${teamName}/edit/basic`} nextPath={`/team/${teamName}/edit/members`} />
    </>
  )
}
