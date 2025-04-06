import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import ProfileEditLogs from '@/features/profile/log/ui/ProfileEditLogs'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default async function ProfileEditLogPage() {
  return (
    <div className="flex h-full flex-col bg-[#EDF3FF] ">
      <label className="text-xl font-bold">나의 로그</label>

      <div className="mt-5">
        <Link href="/profile/edit/log/new">
          <Button
            mode="main"
            animationMode="main"
            className="flex w-full items-center justify-center gap-[0.68rem] rounded-lg bg-main2 px-5 py-2 text-sm font-semibold text-white"
          >
            추가하기
          </Button>
        </Link>
        {/* 로그 리스트 */}
        <ProfileEditLogs />
      </div>

      <ProfileEditBottomNav nextPath="/profile/edit/basic" isFirstPage={true} />
    </div>
  )
}
