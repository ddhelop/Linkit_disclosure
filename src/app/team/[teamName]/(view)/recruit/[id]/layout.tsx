import MiniTeamCard from '@/shared/components/MiniTeamCard'

export default function TeamViewRecruitDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { teamName: string }
}) {
  return (
    <div className="absolute left-0 flex h-[calc(100vh-4rem)] w-full justify-center bg-white pt-[3.63rem]">
      <div className="flex w-[83%] justify-center gap-8">
        <div className="w-[49rem]">{children}</div>
        <div>
          <MiniTeamCard teamName={params.teamName} />
        </div>
      </div>
    </div>
  )
}
