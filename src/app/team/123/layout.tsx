import TeamViewClient from '@/features/team/view/common/TeamViewClient'

export default function TeamLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <div className="flex flex-col">
      <TeamViewClient />
      {children}
    </div>
  )
}
