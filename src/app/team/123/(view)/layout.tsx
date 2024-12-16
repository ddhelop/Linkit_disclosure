import TeamViewClient from '@/features/team/view/common/TeamViewClient'

export default function TeamLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <div className={`flex h-[calc(100vh-4rem)] flex-col`}>
      <TeamViewClient />
      <div className="h-full bg-grey10 px-[7.12rem]">{children}</div>
    </div>
  )
}
