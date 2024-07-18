import MatchNavigation from '@/components/Match/MatchNavigation'
import SaveProfile from '@/components/Match/SaveProfile'

export default function SaveTeamProfilePage() {
  return (
    <div className="flex w-full gap-9 pt-[61px]">
      {/* 네비게이션 바 */}
      <div className="flex w-[40%] justify-end">
        <MatchNavigation />
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-[0.31rem] pt-12">
          <h1 className="text-2xl font-bold">찜한 내역</h1>
        </div>
        <SaveProfile />
      </div>
    </div>
  )
}
