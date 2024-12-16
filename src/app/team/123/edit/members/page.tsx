import TeamEditMembers from '@/features/team/edit/members/TeamEditMembers'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function TeamEditMembersPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">팀 구성원</h1>
      <TeamEditMembers />
      <Link href="/team/edit/123/members/new">
        <Button mode="main2" animationMode="main" className="mt-5 w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>
    </div>
  )
}
