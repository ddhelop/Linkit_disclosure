import AccomplishMatch from '@/components/Match/AccomplishMatch'
import MatchNavigation from '@/components/Match/MatchNavigation'

export default function AccomplishMatchPage() {
  return (
    <div className="flex w-full gap-9 pt-[61px]">
      {/* 네비게이션 바 */}
      <div className="flex w-[40%] justify-end">
        <MatchNavigation />
      </div>
      <div className="w-full">
        <AccomplishMatch />
      </div>
    </div>
  )
}
