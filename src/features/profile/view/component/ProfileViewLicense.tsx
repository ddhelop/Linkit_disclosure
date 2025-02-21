import { useProfileView } from '@/entities/profile/model/ProfileViewContext'
import { EditableContainer } from './common/EditableContainer'
import Image from 'next/image'

export default function ProfileViewLicense() {
  const { profileData } = useProfileView()
  const isMyProfile = profileData?.isMyProfile

  return (
    <EditableContainer
      isEditable={isMyProfile}
      editPath="/profile/edit/certifications"
      className="flex w-full flex-col gap-5 rounded-xl bg-white p-5 md:px-[2.75rem] md:py-[1.88rem]"
    >
      <h1 className="font-semibold">자격증</h1>

      <div className="flex flex-col gap-2">
        {/* 데이터가 없을 시 */}
        {profileData?.profileLicenseItems.length === 0 &&
          (isMyProfile ? (
            <div className="flex w-full items-center text-sm text-grey60">
              수정 버튼을 눌러 내용을 작성하면 매칭 가능성이 높아져요
            </div>
          ) : (
            <div className="flex w-full items-center text-sm text-grey60">아직 추가하지 않았어요</div>
          ))}
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
