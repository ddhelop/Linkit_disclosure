import ProfileEditLog from '@/features/profile/edit/components/ProfileEditLog'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileEditLogPage() {
  return (
    <>
      <label className="text-xl font-bold">나의 로그</label>

      <div className="mt-5">
        <ProfileEditLog />
      </div>
    </>
  )
}
