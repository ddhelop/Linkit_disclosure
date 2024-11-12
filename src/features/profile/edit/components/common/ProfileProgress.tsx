// ProfileProgress.tsx
import { useProfile } from '@/features/profile/edit/context/ProfileContext'

export default function ProfileProgress() {
  // ProfileProvider에서 제공하는 profileData를 받아옵니다.
  const { profileData } = useProfile()

  // 프로필 완성도 (progress)를 가져옵니다.
  const progress = profileData?.profileCompletionMenu?.profileCompletion || 0

  return (
    <div className="mb-4 flex h-[4.43rem] w-[17.5rem] flex-col gap-4 rounded-lg border border-grey40 px-[0.94rem] py-[0.75rem]">
      <div className="mb-1 text-xs text-grey80">프로필 완성도</div>
      <div className="relative h-1.5 rounded-full bg-grey40">
        {/* 시작 지점 동그라미 */}
        <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-blue-500"></div>

        {/* 프로그레스 바 */}
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
          style={{ width: `${progress}%` }}
        ></div>

        {/* 완료 지점 도형 (마름모 모양) */}
        {progress > 0 && (
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 transform bg-teal-400"
            style={{ left: `calc(${progress}% - 0.375rem)` }}
          ></div>
        )}

        {/* 끝 지점 동그라미 */}
        {progress > 0 && (
          <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-grey40"></div>
        )}
      </div>
    </div>
  )
}
