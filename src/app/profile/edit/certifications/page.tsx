import ProfileEditCertifications from '@/features/profile/edit/components/ProfileEditCertifications'

export default function ProfileEditCertificationsPage() {
  return (
    <>
      <label className="text-xl font-bold">자격증</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditCertifications />
      </div>
    </>
  )
}
