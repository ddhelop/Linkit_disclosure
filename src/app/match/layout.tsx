import MatchListController from '@/features/match/common/MatchListController'

export default function MatchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center bg-[#FCFCFD]">
      <div className="flex w-[95%] flex-col pt-[3.63rem] lg:w-[66%]">
        <h1 className="text-2xl font-semibold text-grey90">매칭 관리</h1>
        <MatchListController />
        {children}
      </div>
    </div>
  )
}
