import TeamEditMembersList from '@/features/team/edit/members/TeamEditMembersList'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function TeamEditMembersPage() {
  return (
    <div className="flex flex-col ">
      <h1 className=" text-xl font-bold">팀 구성원</h1>

      <TeamEditMembersList />
    </div>
  )
}
