import FindMember from '@/components/FindMember/FindMember'
import FindMemberLeftNav from '@/components/FindMember/FindMemberLeftNav'

export default function FindingMemberPage() {
  return (
    <div className="flex w-full justify-center pt-[70px]">
      <FindMemberLeftNav />
      <FindMember />
    </div>
  )
}
