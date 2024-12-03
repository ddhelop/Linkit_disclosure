import { useProfile } from '@/entities/profile/model/ProfileContext'
import { EditableContainer } from './common/EditableContainer'
import Image from 'next/image'

export default function ProfileViewLicense() {
  const { profileData } = useProfile()
  const isMyProfile = profileData?.isMyProfile

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/license"
      className="flex w-[95%] flex-col gap-5 rounded-xl bg-white px-[2.75rem] py-[1.88rem]"
    >
      <h1 className="font-semibold">자격증</h1>

      <div className="flex flex-col gap-2">
        {profileData?.profileLicenseItems.map((license) => (
          <div key={license.profileLicenseId} className="flex flex-col gap-2 rounded-lg bg-grey10 px-6 py-4">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-grey80">{license.licenseName}</p>
              {license.isLicenseVerified && <Image src="/common/cert_badge.svg" alt="certed" width={16} height={16} />}
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm">{license.licenseInstitution}</p>{' '}
              <p className="text-xs font-normal text-grey60">| {license.licenseAcquisitionDate}</p>
            </div>
          </div>
        ))}
      </div>
    </EditableContainer>
  )
}
