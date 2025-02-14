import TeamViewClient from '@/features/team/view/common/TeamViewClient'

export default function TeamLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string; teamName: string }
}) {
  return (
    <div
      className={`h-[calc(100v h-4rem)]
    flex flex-col bg-grey10`}
    >
      <TeamViewClient params={{ teamName: params.teamName }} />
      <div className="min-h-[calc(100vh-26.5rem)] bg-grey10 px-5 lg:px-[7.12rem]">{children}</div>
    </div>
  )
}
