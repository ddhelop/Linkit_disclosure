import FromMyMatch from '@/components/Match/FromMyMatch'
import MatchNavigation from '@/components/Match/MatchNavigation'
import ToMyMatch from '@/components/Match/ToMyMatch'

export default function ToMatchPage() {
  return (
    <div className="flex w-full gap-9 pt-[61px]">
      {/* 네비게이션 바 */}
      <div className="flex w-[40%] justify-end">
        <MatchNavigation />
      </div>
      <div className="w-full">
        <ToMyMatch />
      </div>
    </div>
  )
}
