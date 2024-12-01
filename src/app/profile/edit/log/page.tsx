import ProfileEditLog from '@/features/profile/edit/components/ProfileEditLog'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileEditLogPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">나의 로그</label>

      <div className="mt-5">
        <ProfileEditLog />
      </div>
    </div>
  )
}
