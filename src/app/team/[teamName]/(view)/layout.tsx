import TeamViewClient from '@/features/team/view/common/TeamViewClient'

export default function TeamLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <div
      className={`h-[calc(100v h-4rem)]
    flex flex-col bg-grey10`}
    >
      <TeamViewClient />
      <div className="min-h-[calc(100vh-26.5rem)] bg-grey10 px-[7.12rem]">{children}</div>
    </div>
  )
}
