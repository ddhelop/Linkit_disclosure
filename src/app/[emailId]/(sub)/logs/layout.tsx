import ProfileViewWideInfo from '@/features/profile-view/ui/ProfileViewWideInfo'

export default async function ProfileLogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-10">
      <ProfileViewWideInfo />
      <div>{children}</div>
    </div>
  )
}
