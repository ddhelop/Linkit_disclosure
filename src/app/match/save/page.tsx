import MatchNavigation from '@/components/Match/MatchNavigation'
import SaveProfile from '@/components/Match/SaveProfile'

export default function SaveProfilePage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9 px-4 pt-[61px] lg:flex-row lg:items-start lg:px-0">
      {/* 네비게이션 바 */}
      <div className="flex w-full justify-center lg:w-[40%] lg:justify-end">
        <MatchNavigation />
      </div>
      <div className="flex w-full flex-col items-center lg:items-start">
        <div className="flex flex-col gap-[0.31rem] lg:pt-12">
          <h1 className="text-2xl font-bold">찜한 내역</h1>
        </div>
        <SaveProfile />
      </div>
    </div>
  )
}
