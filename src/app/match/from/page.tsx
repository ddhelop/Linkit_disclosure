import FromMyMatch from '@/components/Match/FromMyMatch'
import MatchNavigation from '@/components/Match/MatchNavigation'

export default function FromMatchPage() {
  return (
    <div className="flex w-full flex-col items-center gap-9 px-4 pt-[61px] lg:flex-row lg:items-start lg:px-0">
      {/* 네비게이션 바 */}
      <div className="flex w-full justify-center lg:w-[40%] lg:justify-end">
        <MatchNavigation />
      </div>
      <div className="flex w-full justify-center">
        <FromMyMatch />
      </div>
    </div>
  )
}
