import TeamEditRecruitList from '@/features/team/edit/recruitment/TeamEditRecruitList'
import TeamEditRecruitment from '@/features/team/edit/recruitment/TeamEditRecruitment'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function TeamEditRecruitPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">모집 공고</h1>
      <p className="pt-2 text-xs font-normal text-grey60"></p>

      <TeamEditRecruitment />
      <Link href="/team/123/edit/recruitment/new">
        <Button mode="main2" animationMode="main" className="mt-5 w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>
      <TeamEditRecruitList />
    </div>
  )
}
