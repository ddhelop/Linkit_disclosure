import NewCertificate from '@/features/profile/edit/components/New/NewCertificate'

export default function ProfileEditNewCertificationsPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">자격증</label>

      <div className="mt-5 rounded-xl">
        <NewCertificate />
      </div>
    </div>
  )
}
