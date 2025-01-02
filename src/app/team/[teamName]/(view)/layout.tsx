import TeamViewClient from '@/features/team/view/common/TeamViewClient'

export default function TeamLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <div className={`flex h-[calc(100vh-4rem)] flex-col bg-grey10`}>
      <TeamViewClient />
      <div className=" bg-grey10 px-[7.12rem]">{children}</div>
    </div>
  )
}
